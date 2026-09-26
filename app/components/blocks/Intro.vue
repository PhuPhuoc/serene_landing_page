<!-- app/c<!-- app/component/blocks/Intro.vue -->
<script setup lang="ts">
import type { IntroBlock } from "~/types/page";

defineProps<
  Pick<IntroBlock, "eyebrow" | "heading" | "body" | "tags" | "cta">
>();
</script>

<template>
  <section
    id="club"
    class="bg-[var(--color-bg)] pt-20 pb-16 lg:pt-[144px] lg:pb-[128px]"
  >
    <div
      class="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-start"
    >
      <!-- Cột trái (Col 1 -> 3) -->
      <div class="lg:col-span-3 flex flex-col gap-[14px] lg:pt-[14px]">
        <p
          v-if="eyebrow"
          class="m-0 text-[12px] font-medium tracking-[0.18em] uppercase text-[#b88868]"
        >
          {{ eyebrow }}
        </p>

        <h2
          v-if="heading"
          class="m-0 font-display font-light text-[22px] leading-snug text-[#6B5641]"
        >
          {{ heading }}
        </h2>
      </div>

      <!-- Cột phải (Col 4 -> 11 / span 8) -->
      <div class="lg:col-span-8 lg:col-start-4 flex flex-col gap-10">
        <!-- Body Text -->
        <p
          v-if="body"
          class="m-0 font-display font-light text-[1.625rem] sm:text-[2rem] md:text-[2.25rem] leading-[1.38] text-[#33261A] text-pretty"
        >
          {{ body }}
        </p>

        <!-- Khung kẻ ngang & Đáy -->
        <div class="pt-[28px] border-t border-[#D6C4AA]">
          <div class="flex flex-wrap items-center justify-between gap-8">
            <!-- List Tags -->
            <ul
              v-if="tags?.length"
              class="m-0 p-0 flex list-none flex-wrap gap-[28px] text-[12px] font-medium tracking-[0.18em] uppercase text-[#6B5641]"
            >
              <li v-for="tag in tags" :key="tag.id">
                {{ tag.label }}
              </li>
            </ul>

            <!-- CTA Link -->
            <NuxtLink
              v-if="cta"
              :to="cta.to"
              :target="cta.newTab ? '_blank' : undefined"
              :rel="cta.newTab ? 'noopener noreferrer' : undefined"
              class="group inline-flex items-center gap-[10px] h-[36px] px-1 border-b border-current text-[15px] font-medium tracking-[0.04em] text-[#795B3C] transition-opacity hover:opacity-80"
            >
              <span>{{ cta.label }}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
