<!-- app/pages/[...slug].vue -->
<script setup lang="ts">
import type { PageResponse } from "~/types/page";

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => {
  const params = route.params.slug;
  if (!params) return "home";
  return Array.isArray(params)
    ? params.filter(Boolean).join("/")
    : String(params);
});

const { data: page, error } = await useFetch<PageResponse>(
  () => `/api/pages/${slug.value}`,
  {
    query: { locale },
    key: `page-data-${slug.value}-${locale}`,
  },
);

if (error.value || !page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const localeSlugMap = useState<Record<string, string | null>>(
  "localeSlugMap",
  () => ({}),
);

watch(
  () => page.value?.alternateSlugs,
  (newSlugs) => {
    if (newSlugs) {
      localeSlugMap.value = newSlugs;
    }
  },
  { immediate: true },
);

useSeoMeta({
  title: () => page.value?.title || "Serene Saigon",
});
</script>

<template>
  <main v-if="page">
    <template v-for="block in page.blocks" :key="block.id">
      <BlocksHero
        v-if="block.__component === 'blocks.hero'"
        :background-image="block.backgroundImage"
        :eyebrow="block.eyebrow"
        :title="block.title"
        :subtitle="block.subtitle"
        :image-caption="block.imageCaption"
        :primary-cta="block.primaryCta"
        :secondary-cta="block.secondaryCta"
      />
      <BlocksIntro
        v-else-if="block.__component === 'blocks.intro'"
        :eyebrow="block.eyebrow"
        :heading="block.heading"
        :body="block.body"
        :tags="block.tags"
        :cta="block.cta"
      />

      <BlocksDayInLife
        v-else-if="block.__component === 'blocks.day-in-life'"
        :eyebrow="block.eyebrow"
        :heading="block.heading"
        :items="block.items"
      />
    </template>
  </main>
</template>
