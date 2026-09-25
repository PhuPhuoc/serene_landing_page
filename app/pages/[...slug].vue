<!-- app/pa<!-- app/pages/[...slug].vue -->
<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const slug = computed(
  () => [route.params.slug].flat().filter(Boolean).join("/") || "home",
);

const { data: page, error } = await useFetch(() => `/api/pages/${slug.value}`, {
  query: { locale },
});

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
  page,
  (p) => {
    if (p?.alternateSlugs) localeSlugMap.value = p.alternateSlugs;
  },
  { immediate: true },
);

useSeoMeta({ title: page.value.title });
</script>

<template>
  <main v-if="page">
    <!-- Bước sau: <BlockRenderer :blocks="page.blocks" /> -->
    <h1 class="section">{{ page.title }}</h1>
  </main>
</template>
ges/[...slug].vue -->
