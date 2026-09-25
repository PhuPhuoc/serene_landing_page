// server/api/navigation.get.ts
import { StrapiHeader } from "../types/strapi.ts";
import { strapiFetch, NavLink, linkPopulate, mapLink } from "../utils/strapi";

export default defineEventHandler(async (event) => {
  const { strapiUrl } = useRuntimeConfig();
  const locale = getQuery(event).locale === "vi" ? "vi" : "en";

  const { data } = await strapiFetch<{ data: StrapiHeader }>("/header", {
    locale,
    populate: {
      logo: true,
      mainLinks: linkPopulate,
      utilityLink: linkPopulate,
      cta: linkPopulate,
    },
  });

  const abs = (u: string) => (u.startsWith("http") ? u : strapiUrl + u);

  const mainLinks = (data.mainLinks ?? [])
    .map(mapLink)
    .filter((l): l is NavLink => l !== null);

  return {
    logo: {
      url: abs(data.logo.url),
      alt: data.logo.alternativeText || "Serene Saigon",
      width: data.logo.width,
      height: data.logo.height,
    },
    mainLinks: mainLinks,
    utilityLink: mapLink(data.utilityLink),
    cta: mapLink(data.cta),
  };
});
