<script setup lang="ts">
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const { data: nav } = await useFetch("/api/navigation", { query: { locale } });

const linkProps = (l: { to: string; external: boolean; newTab: boolean }) => ({
  to: l.external ? l.to : localePath(l.to),
  target: l.newTab ? "_blank" : undefined,
  rel: l.external ? "noopener noreferrer" : undefined,
});
</script>

<template>
  <header
    v-if="nav"
    class="flex items-center justify-between gap-3 px-[4vw] border-b border-[var(--color-border)] h-[75px]"
  >
    <NuxtLink
      :to="localePath('/the-club')"
      class="site-header__logo"
      aria-label="Home"
    >
      <img
        :src="nav.logo.url"
        :alt="nav.logo.alt"
        :width="nav.logo.width"
        :height="nav.logo.height"
        class="block w-[127px] h-10"
      />
    </NuxtLink>

    <nav aria-label="Main">
      <ul class="flex gap-8 list-none m-0 p-0">
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

    <div class="flex items-center gap-6">
      <NuxtLink
        v-if="nav.utilityLink"
        v-bind="linkProps(nav.utilityLink)"
        class="text-[var(--color-text)] font-display text-sm font-medium tracking-wide hover:underline hover:underline-offset-4 hover:decoration-1 hover:decoration-[var(--color-text)] transition-colors duration-150"
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
        class="btn-outline py-2 px-4"
      >
        {{ nav.cta.label }}
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply text-[var(--color-text-muted)] font-display text-[0.9375rem] font-[400] tracking-[0.01em] transition-colors duration-150;
}

.nav-link:hover {
  @apply text-[var(--color-text)];
}

.nav-link.is-active {
  @apply text-[var(--color-text)] underline underline-offset-4 decoration-1 font-medium;
}

/* Language switcher */
.lang {
  @apply inline-flex items-center gap-2 font-display text-[0.875rem] font-light tracking-[0.04em] text-[var(--color-text-light)];
}

.lang a {
  @apply text-[var(--color-text-light)] transition-colors duration-150;
}

.lang a:hover {
  @apply text-[var(--color-text)];
}

.lang .is-current {
  @apply font-medium text-[var(--color-text)];
}
</style>
