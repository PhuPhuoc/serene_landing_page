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

  console.log("Url: ", url);
  return res as T;
}
