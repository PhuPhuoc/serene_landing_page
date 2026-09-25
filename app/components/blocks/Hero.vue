<!-- app/component/blocks/Hero.vue -->
<script setup lang="ts">
import type { HeroBlock } from "~/types/page";

const props =
  defineProps<
    Pick<
      HeroBlock,
      | "eyebrow"
      | "title"
      | "subtitle"
      | "backgroundImage"
      | "imageCaption"
      | "primaryCta"
      | "secondaryCta"
    >
  >();

const bgUrl = computed(
  () => props.backgroundImage.formats?.large?.url ?? props.backgroundImage.url,
);
</script>
<template>
  <section
    class="relative flex min-h-[90vh] items-end overflow-hidden"
    data-ground="dark"
  >
    <!-- Background Image -->
    <img
      :src="bgUrl"
      :alt="backgroundImage.alternativeText || title"
      :width="backgroundImage.width"
      :height="backgroundImage.height"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <!-- Overlay mờ tối để tôn màu chữ -->
    <div
      class="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/70 via-black/30 to-black/20"
    />

    <!-- Main Content Box -->
    <div
      class="relative z-10 w-full px-[7vw] pb-16 pt-24 text-[var(--color-paper)]"
    >
      <!-- Eyebrow -->
      <p
        v-if="eyebrow"
        class="eyebrow mb-6 !text-[var(--color-paper)]/70 tracking-[0.25em] text-xs uppercase"
      >
        {{ eyebrow }}
      </p>

      <!-- Title -->
      <h1
        class="max-w-[20ch] text-balance font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] tracking-tight !text-[var(--color-paper)] mb-6"
      >
        {{ title }}
      </h1>

      <!-- Subtitle -->
      <p
        v-if="subtitle"
        class="max-w-[46ch] text-base font-light text-[var(--color-paper)]/85 leading-relaxed mb-8"
      >
        {{ subtitle }}
      </p>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-wrap items-center gap-6">
        <NuxtLink
          v-if="primaryCta"
          :to="primaryCta.to"
          :target="primaryCta.newTab ? '_blank' : undefined"
          :rel="primaryCta.newTab ? 'noopener noreferrer' : undefined"
          class="inline-flex items-center gap-3 bg-[var(--color-paper)] px-7 py-3.5 font-display text-sm font-normal tracking-wide text-[var(--color-espresso)] transition-all duration-300 hover:bg-[var(--color-cream)] shadow-sm"
        >
          <span>{{ primaryCta.label }}</span>
          <span
            aria-hidden="true"
            class="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
            >→</span
          >
        </NuxtLink>

        <NuxtLink
          v-if="secondaryCta"
          :to="secondaryCta.to"
          :target="secondaryCta.newTab ? '_blank' : undefined"
          :rel="secondaryCta.newTab ? 'noopener noreferrer' : undefined"
          class="border-b border-[var(--color-paper)]/50 pb-1 font-display text-sm font-normal text-[var(--color-paper)] transition-all duration-200 hover:border-[var(--color-paper)] hover:text-white"
        >
          {{ secondaryCta.label }}
        </NuxtLink>
      </div>
    </div>

    <!-- Image Caption (Góc dưới bên phải) -->
    <div
      v-if="imageCaption"
      class="absolute bottom-10 right-[7vw] z-10 flex items-center gap-3 text-white/90"
    >
      <span class="h-px w-10 bg-white/70" />
      <span
        class="mono-sm text-[0.6875rem] tracking-[0.22em] uppercase font-mono text-white/90"
      >
        {{ imageCaption }}
      </span>
    </div>
  </section>
</template>
