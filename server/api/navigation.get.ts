// server/api/navigation.get.ts
import { strapiFetch } from "../utils/strapi";

type StrapiLink = {
  id: number;
  label: string;
  externalUrl?: string | null;
  openInNewTab?: boolean;
  page?: { slug: string } | null;
};

type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

type StrapiHeader = {
  logo: StrapiMedia;
  mainLinks?: StrapiLink[];
  utilityLink?: StrapiLink | null;
  cta?: StrapiLink | null;
};

type NavLink = {
  id: number;
  label: string;
  external: boolean;
  to: string;
  newTab: boolean;
};

const linkPopulate = { populate: { page: { fields: ["slug"] } } };

function mapLink(l?: StrapiLink | null): NavLink | null {
  if (!l) return null;
  const external = !l.page;
  return {
    id: l.id,
    label: l.label,
    external,
    to: l.page
      ? l.page.slug === "home"
        ? "/"
        : `/${l.page.slug}`
      : (l.externalUrl ?? "#"),
    newTab: !!l.openInNewTab,
  };
}

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
