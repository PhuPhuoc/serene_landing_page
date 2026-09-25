<script setup lang="ts">
import "~~/assets/css/global.css";

const { locale } = useI18n();

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
