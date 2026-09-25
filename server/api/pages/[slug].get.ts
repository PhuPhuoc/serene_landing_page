// server/api/pages/[slug].get.ts
import { strapiFetch } from "~~/server/utils/strapi";

type StrapiPage = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  hidden?: boolean;
  // sau này thêm: blocks, seo
};

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")!;
  const locale = getQuery(event).locale === "vi" ? "vi" : "en";

  const res = await strapiFetch<{ data: StrapiPage[] }>("/pages", {
    locale,
    filters: { slug: { $eq: slug } },
    // thêm populate cho blocks + seo
  });

  const page = res.data[0];
  if (!page || page.hidden)
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  return page;
});
