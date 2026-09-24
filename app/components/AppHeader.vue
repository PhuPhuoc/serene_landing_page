<!-- app/components/AppHeader.vue -->
<script setup lang="ts">
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const { data: nav } = await useFetch("/api/navigation", { query: { locale } });

const linkProps = (l: { to: string; external: boolean; newTab: boolean }) => ({
  to: l.external ? l.to : localePath(l.to),
  target: l.newTab ? "_blank" : undefined,
  rel: l.newTab ? "noopener noreferrer" : undefined,
});
</script>

<template>
  <header v-if="nav" class="site-header">
    <NuxtLink :to="localePath('/')" class="site-header__logo" aria-label="Home">
      <img
        :src="nav.logo.url"
        :alt="nav.logo.alt"
        :width="nav.logo.width"
        :height="nav.logo.height"
      />
    </NuxtLink>

    <nav aria-label="Main">
      <ul class="site-header__links">
        <li v-for="l in nav.mainLinks" :key="l.id">
          <NuxtLink
            v-bind="linkProps(l)"
            class="nav-link"
            exact-active-class="is-active"
          >
            {{ l.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="site-header__right">
      <NuxtLink
        v-if="nav.utilityLink"
        v-bind="linkProps(nav.utilityLink)"
        class="nav-link"
      >
        {{ nav.utilityLink.label }}
      </NuxtLink>

      <div class="lang">
        <template v-for="(loc, i) in locales" :key="loc.code">
          <span v-if="i" aria-hidden="true">/</span>
          <NuxtLink
            :to="switchLocalePath(loc.code)"
            :class="{ 'is-current': loc.code === locale }"
            >{{ loc.name }}</NuxtLink
          >
        </template>
      </div>

      <NuxtLink
        v-if="nav.cta"
        v-bind="linkProps(nav.cta)"
        class="btn btn-outline"
      >
        {{ nav.cta.label }}
      </NuxtLink>
    </div>
  </header>
</template>
