// serve/api/pages/[slug].get.ts
import type {
  StrapiPage,
  StrapiPageBlock,
  StrapiMedia,
} from "~~/server/types/strapi";

import { strapiFetch, linkPopulate, mapLink } from "~~/server/utils/strapi";

const SUPPORTED_LOCALES = ["en", "vi"] as const;

type MediaFormat = {
  url: string;
  width?: number;
  height?: number;
};

function getAbsoluteUrl(baseUrl: string, url?: string | null) {
  if (!url) return "";

  return url.startsWith("http") ? url : `${baseUrl}${url}`;
}

function mapMedia(media: StrapiMedia | null | undefined, strapiUrl: string) {
  if (!media) return null;

  return {
    url: getAbsoluteUrl(strapiUrl, media.url),

    alternativeText: media.alternativeText,

    width: media.width,

    height: media.height,

    formats: media.formats
      ? Object.fromEntries(
          Object.entries(media.formats).map(
            ([key, format]: [string, MediaFormat]) => [
              key,
              {
                url: getAbsoluteUrl(strapiUrl, format.url),
                width: format.width,
                height: format.height,
              },
            ],
          ),
        )
      : undefined,
  };
}

function mapBlock(block: StrapiPageBlock, strapiUrl: string) {
  switch (block.__component) {
    case "blocks.hero":
      return {
        __component: block.__component,

        id: block.id,

        eyebrow: block.eyebrow,

        title: block.title,

        subtitle: block.subtitle,

        backgroundImage: mapMedia(block.backgroundImage, strapiUrl),

        imageCaption: block.imageCaption,

        primaryCta: mapLink(block.primaryCta),

        secondaryCta: mapLink(block.secondaryCta),
      };

    case "blocks.intro":
      return {
        __component: block.__component,

        id: block.id,

        eyebrow: block.eyebrow,

        heading: block.heading,

        body: block.body,

        tags: block.tags ?? [],

        cta: mapLink(block.cta),
      };

    case "blocks.day-in-life":
      return {
        __component: block.__component,

        id: block.id,

        eyebrow: block.eyebrow,

        heading: block.heading,

        items: (block.items ?? []).map((item) => ({
          id: item.id,
          period: item.period,
          title: item.title,
          image: mapMedia(item.image, strapiUrl),
          imageCaption: item.imageCaption,
          description: item.description,
          cta: mapLink(item.cta),
        })),
      };
  }
}

async function getSlugForLocale(documentId: string, locale: string) {
  try {
    const res = await strapiFetch<{
      data: {
        slug: string;
        hidden?: boolean;
      } | null;
    }>(`/pages/${documentId}`, {
      locale,
      fields: ["slug", "hidden"],
    });

    if (!res.data || res.data.hidden) {
      return null;
    }

    return res.data.slug;
  } catch {
    return null;
  }
}

export default defineEventHandler(async (event) => {
  const { strapiUrl } = useRuntimeConfig();

  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
    });
  }

  const queryLocale = getQuery(event).locale;

  const locale = queryLocale === "vi" ? "vi" : "en";

  let res;

  try {
    res = await strapiFetch<{
      data: StrapiPage[];
    }>("/pages", {
      locale,

      filters: {
        slug: {
          $eq: slug,
        },
      },

      populate: {
        blocks: {
          on: {
            "blocks.hero": {
              populate: {
                backgroundImage: true,

                primaryCta: linkPopulate,

                secondaryCta: linkPopulate,
              },
            },

            "blocks.intro": {
              populate: {
                tags: true,

                cta: linkPopulate,
              },
            },

            "blocks.day-in-life": {
              populate: {
                items: {
                  populate: {
                    image: true,
                    cta: linkPopulate,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (err: any) {
    console.error("Strapi error:", err?.data ?? err?.message ?? err);

    throw createError({
      statusCode: err?.statusCode ?? 500,

      statusMessage: "Strapi fetch failed",
    });
  }

  const page = res.data[0];

  if (!page || page.hidden) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
    });
  }

  const otherLocales = SUPPORTED_LOCALES.filter((l) => l !== locale);

  const alternates = await Promise.all(
    otherLocales.map(
      async (l) => [l, await getSlugForLocale(page.documentId, l)] as const,
    ),
  );

  const blocks = (page.blocks ?? [])
    .map((block) => mapBlock(block, strapiUrl))
    .filter((block): block is NonNullable<ReturnType<typeof mapBlock>> =>
      Boolean(block),
    );

  return {
    id: page.id,

    documentId: page.documentId,

    title: page.title,

    slug: page.slug,

    locale: page.locale,

    hidden: page.hidden,

    blocks,

    alternateSlugs: {
      [locale]: page.slug,

      ...Object.fromEntries(alternates),
    } as Record<string, string | null>,
  };
});
