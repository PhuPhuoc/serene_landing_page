<!-- app/components/AppHeader.vue -->
<script setup lang="ts">
const { locale, locales } = useI18n();
const localePath = useLocalePath();

const { data: nav } = await useFetch("/api/navigation", { query: { locale } });

const localeSlugMap = useState<Record<string, string | null>>(
  "localeSlugMap",
  () => ({}),
);

type AppLocale = "en" | "vi";

function homeHref(code: AppLocale) {
  return code === "en" ? "/" : `/${code}`;
}

function langHref(code: AppLocale) {
  const slug = localeSlugMap.value[code];
  return slug ? localePath(`/${slug}`, code) : homeHref(code);
}

const linkProps = (l: { to: string; external: boolean; newTab: boolean }) => ({
  to: l.external ? l.to : localePath(l.to),
  target: l.newTab ? "_blank" : undefined,
  rel: l.external ? "noopener noreferrer" : undefined,
});

const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header v-if="nav" class="site-header" :class="{ 'is-scrolled': isScrolled }">
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
      <ul class="flex gap-5 list-none m-0 p-0">
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
            :to="langHref(loc.code)"
            :class="{ 'is-current': loc.code === locale }"
            >{{ loc.name }}</NuxtLink
          >
        </template>
      </div>

      <NuxtLink
        v-if="nav.cta"
        v-bind="linkProps(nav.cta)"
        class="btn-outline text-sm py-2 px-4"
      >
        {{ nav.cta.label }}
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  @apply fixed top-0 left-0 right-0 z-50
    flex items-center justify-between gap-3
    px-[5.5vw]
    h-[75px]
    border-b border-transparent;

  /*
   * Transparent state
   * Header nằm trên Hero
   */
  --header-text: var(--color-paper);
  --header-text-muted: rgba(253, 249, 242, 0.8);
  --header-text-light: rgba(253, 249, 242, 0.7);
  --header-border: rgba(253, 249, 242, 0.35);

  color: var(--header-text);
  background-color: transparent;
  border-color: transparent;

  transition:
    color 250ms ease,
    background-color 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
}

/*
 * Scrolled state
 */
.site-header.is-scrolled {
  --header-text: var(--color-text);
  --header-text-muted: var(--color-text-muted);
  --header-text-light: var(--color-text-light);
  --header-border: var(--color-border);

  background-color: var(--color-bg);
  border-color: var(--header-border);

  box-shadow: 0 4px 20px rgba(42, 26, 18, 0.04);
}

.nav-link {
  @apply font-display
    text-[14px]
    font-[400]
    tracking-[0.01em]
    transition-colors duration-150;

  color: var(--header-text-muted);
}

.nav-link:hover {
  color: var(--header-text);
}

.nav-link.is-active {
  color: var(--header-text);

  @apply underline
    underline-offset-4
    decoration-1
    font-medium;
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
