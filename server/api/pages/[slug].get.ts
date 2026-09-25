// server/api/pages/[slug].get.ts
import { strapiFetch } from "~~/server/utils/strapi";

type StrapiPage = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  hidden?: boolean;
  blocks?: unknown[];
};

const SUPPORTED_LOCALES = ["en", "vi"] as const;

async function getSlugForLocale(documentId: string, locale: string) {
  try {
    const res = await strapiFetch<{
      data: { slug: string; hidden?: boolean } | null;
    }>(`/pages/${documentId}`, { locale, fields: ["slug", "hidden"] });
    if (!res.data || res.data.hidden) return null;
    return res.data.slug;
  } catch {
    return null; // bản dịch locale này chưa tồn tại/chưa publish
  }
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")!;
  const locale = getQuery(event).locale === "vi" ? "vi" : "en";

  const res = await strapiFetch<{ data: StrapiPage[] }>("/pages", {
    locale,
    filters: { slug: { $eq: slug } },
    // ...giữ nguyên populate blocks bạn đã thêm
  });

  const page = res.data[0];
  if (!page || page.hidden) {
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  }

  const otherLocales = SUPPORTED_LOCALES.filter((l) => l !== locale);
  const alternates = await Promise.all(
    otherLocales.map(
      async (l) => [l, await getSlugForLocale(page.documentId, l)] as const,
    ),
  );

  return {
    ...page,
    alternateSlugs: {
      [locale]: page.slug,
      ...Object.fromEntries(alternates),
    } as Record<string, string | null>,
  };
});
