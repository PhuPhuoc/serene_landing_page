<!-- app/components/AppHeader.vue -->
<script setup lang="ts">
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

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

// Kiểm tra trang hiện tại có Hero Banner tối màu hay không
const pagesWithHero = computed(() => {
  const path = route.path;
  return (
    path === "/" ||
    path === "/vi" ||
    path.endsWith("/the-club") ||
    path.endsWith("/ve-serene")
  );
});

const isTransparent = computed(() => {
  return pagesWithHero.value && !isScrolled.value;
});

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    v-if="nav"
    class="site-header"
    :class="{ 'is-transparent': isTransparent, 'is-scrolled': isScrolled }"
  >
    <div class="site-header__container">
      <!-- Logo Container -->
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
          class="logo-img default-logo"
        />

        <!-- 
        <img src="/images/logo-cream.svg" alt="Logo Light" class="logo-img logo-light" />
        <img src="/images/logo-brown.svg" alt="Logo Dark" class="logo-img logo-dark" /> 
        -->
      </NuxtLink>

      <!-- Main Navigation -->
      <nav aria-label="Main" class="site-header__nav">
        <ul class="nav-list">
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

      <!-- Right Utility Actions -->
      <div class="site-header__actions">
        <!-- Utility Link (e.g. Journal / Tạp chí) -->
        <NuxtLink
          v-if="nav.utilityLink"
          v-bind="linkProps(nav.utilityLink)"
          class="utility-link"
        >
          {{ nav.utilityLink.label }}
        </NuxtLink>

        <!-- Language Switcher -->
        <div class="lang-switcher" role="group" aria-label="Language Switcher">
          <template v-for="(loc, i) in locales" :key="loc.code">
            <span v-if="i" class="lang-divider" aria-hidden="true">/</span>
            <NuxtLink
              :to="langHref(loc.code)"
              class="lang-btn"
              :class="{ 'is-current': loc.code === locale }"
            >
              {{ loc.code.toUpperCase() }}
            </NuxtLink>
          </template>
        </div>

        <!-- CTA Button -->
        <NuxtLink v-if="nav.cta" v-bind="linkProps(nav.cta)" class="cta-btn">
          {{ nav.cta.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 
 * 1. TRẠNG THÁI MẶC ĐỊNH (SOLID):
 * Áp dụng cho tất cả các trang thường KHÔNG có Hero banner,
 * hoặc khi đã scroll xuống ở bất kỳ trang nào.
 */
.site-header {
  @apply fixed top-0 left-0 right-0 z-50 border-b;

  --hdr-fg: var(--color-text, #2a1a12);
  --hdr-bg: var(--color-bg, #ffffff);
  --hdr-border: var(--color-border, rgba(42, 26, 18, 0.1));
  --hdr-height: 70px;

  --logo-light-display: none;
  --logo-dark-display: block;

  background-color: var(--hdr-bg);
  border-color: var(--hdr-border);
  color: var(--hdr-fg);

  transition:
    background-color 300ms ease,
    border-color 300ms ease,
    height 300ms ease,
    box-shadow 300ms ease;
}

/* 
 * 2. TRẠNG THÁI IN-HERO (TRANSPARENT): 
 * Chỉ bật khi trang có Hero banner VÀ ở vị trí trên cùng (chưa scroll).
 */
.site-header.is-transparent {
  --hdr-fg: var(--color-paper, #fdf9f2);
  --hdr-bg: transparent;
  --hdr-border: rgba(253, 249, 242, 0.25);
  --hdr-height: 90px;

  --logo-light-display: block;
  --logo-dark-display: none;

  box-shadow: none;
}

/* 
 * 3. TRẠNG THÁI ĐÃ SCROLL:
 * Thêm đổ bóng nhẹ khi cuộn trang
 */
.site-header.is-scrolled {
  box-shadow: 0 4px 20px rgba(42, 26, 18, 0.05);
}

/* Layout Container */
.site-header__container {
  @apply flex items-center justify-between w-full mx-auto px-6 md:px-12;
  max-width: 1440px;
  height: var(--hdr-height);
  gap: 32px;
  transition: height 300ms ease;
}

/* Logo Styles */
.site-header__logo {
  @apply flex items-center shrink-0 cursor-pointer;
}

.logo-img {
  @apply h-10 w-auto block transition-opacity duration-300;
}

.logo-light {
  display: var(--logo-light-display);
}

.logo-dark {
  display: var(--logo-dark-display);
}

/* Navigation Links */
.site-header__nav {
  @apply hidden lg:flex items-center;
}

.nav-list {
  @apply flex items-center gap-5 m-0 p-0 list-none;
}

.nav-link {
  @apply text-sm font-display tracking-[0.03em] whitespace-nowrap cursor-pointer transition-all duration-200;
  color: var(--hdr-fg);
  opacity: 0.8;
  border-bottom: 1px solid transparent;
  padding-bottom: 3px;
}

.nav-link:hover,
.nav-link.is-active {
  opacity: 1;
  border-bottom-color: var(--hdr-fg);
}

.nav-link.is-active {
  font-weight: 500;
}

/* Right Actions & Utilities */
.site-header__actions {
  @apply flex items-center gap-[22px] shrink-0;
}

.utility-link {
  @apply text-sm tracking-[0.03em] transition-opacity duration-150 hidden sm:inline-block;
  color: var(--hdr-fg);
  opacity: 0.85;
}

.utility-link:hover {
  opacity: 1;
}

/* Language Switcher */
.lang-switcher {
  @apply inline-flex items-center gap-0.5 text-[13px] tracking-[0.08em];
}

.lang-btn {
  @apply border-0 bg-transparent py-1 px-1.5 transition-all duration-150 cursor-pointer;
  color: var(--hdr-fg);
  opacity: 0.5;
  font-weight: 400;
}

.lang-btn:hover {
  opacity: 0.85;
}

.lang-btn.is-current {
  opacity: 1;
  font-weight: 600;
}

.lang-divider {
  color: var(--hdr-fg);
  opacity: 0.4;
}

/* CTA Button */
.cta-btn {
  @apply inline-flex items-center justify-center h-10 px-4 sm:px-5
    text-sm tracking-[0.04em] whitespace-nowrap
    border transition-all duration-200;

  color: var(--hdr-fg);
  border-color: var(--hdr-fg);
}

.cta-btn:hover {
  background-color: var(--hdr-fg);
  color: var(--hdr-bg, #ffffff);
}

.site-header.is-transparent .cta-btn:hover {
  color: #2a1a12;
}
</style>
