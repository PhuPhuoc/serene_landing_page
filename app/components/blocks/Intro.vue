<!-- app/c<!-- app/component/blocks/Intro.vue -->
<script setup lang="ts">
import type { IntroBlock } from "~/types/page";

defineProps<
  Pick<IntroBlock, "eyebrow" | "heading" | "body" | "tags" | "cta">
>();
</script>

<template>
  <section class="section bg-[var(--color-bg)] py-20 lg:py-28">
    <div
      class="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] xl:grid-cols-[340px_1fr] lg:gap-20"
    >
      <!-- Cột trái -->
      <div>
        <p
          v-if="eyebrow"
          class="mb-3 text-[0.6875rem] tracking-[0.25em] text-[#b88868] uppercase font-mono"
        >
          {{ eyebrow }}
        </p>

        <h2
          v-if="heading"
          class="font-display font-extralight text-[1.625rem] md:text-[1.875rem] leading-[1.25] text-[var(--color-text-muted)] !mb-0"
        >
          {{ heading }}
        </h2>
      </div>

      <!-- Cột Phải -->
      <div>
        <!-- Body Text lớn chuẩn hình 1 -->
        <p
          v-if="body"
          class="max-w-[38ch] font-display font-extralight text-[2.25rem] sm:text-[2.75rem] md:text-[3.125rem] leading-[1.18] tracking-tight text-[var(--color-espresso)] mb-14 text-pretty"
        >
          {{ body }}
        </p>

        <!-- Khung kẻ ngang & đáy -->
        <div class="border-t border-[var(--color-border)]/70 pt-6">
          <div class="flex flex-wrap items-center justify-between gap-6">
            <!-- List Tags -->
            <ul
              v-if="tags?.length"
              class="m-0 flex list-none flex-wrap gap-8 p-0 font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-[var(--color-text-muted)]"
            >
              <li v-for="tag in tags" :key="tag.id">
                {{ tag.label }}
              </li>
            </ul>

            <!-- CTA Link với gạch chân toàn bộ bên dưới (Chuẩn hình 1) -->
            <NuxtLink
              v-if="cta"
              :to="cta.to"
              :target="cta.newTab ? '_blank' : undefined"
              :rel="cta.newTab ? 'noopener noreferrer' : undefined"
              class="group inline-flex items-center gap-2 border-b border-[var(--color-espresso)]/60 pb-1 font-display text-sm font-normal text-[var(--color-espresso)] transition-colors duration-200 hover:border-[var(--color-espresso)]"
            >
              <span>{{ cta.label }}</span>
              <span
                aria-hidden="true"
                class="text-xs transition-transform duration-200 group-hover:translate-x-0.5"
                >→</span
              >
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
