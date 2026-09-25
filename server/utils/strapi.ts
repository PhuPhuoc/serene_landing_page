// server/utils/strapi.ts
import qs from "qs";

export async function strapiFetch<T = unknown>(
  path: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const { strapiUrl, strapiToken } = useRuntimeConfig();
  const query = qs.stringify(params, { encodeValuesOnly: true });
  const url = `${strapiUrl}/api${path}${query ? `?${query}` : ""}`;

  const res = await $fetch(url, {
    headers: { Authorization: `Bearer ${strapiToken}` },
  });

  return res as T;
}

export type NavLink = {
  id: number;
  label: string;
  external: boolean;
  to: string;
  newTab: boolean;
};

export const linkPopulate = { populate: { page: { fields: ["slug"] } } };

export function mapLink(l?: StrapiLink | null): NavLink | null {
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
