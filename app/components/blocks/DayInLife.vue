<!-- app/components/blocks/DayInLife.vue -->
<script setup lang="ts">
import type { DayInLifeBlock } from "~/types/page";

type Props = Pick<DayInLifeBlock, "eyebrow" | "heading" | "items">;

const props = defineProps<Props>();

const activeIndex = ref(0);

const activeItem = computed(() => props.items[activeIndex.value]!);

function selectTab(index: number) {
  activeIndex.value = index;
}

function imageUrl(item: DayInLifeBlock["items"][number]) {
  return item.image?.formats?.large?.url ?? item.image?.url ?? null;
}

function displayCaption(item: DayInLifeBlock["items"][number]) {
  return item.imageCaption || `Photo · ${item.title}`;
}
</script>

<template>
  <section class="bg-[var(--color-bg)] pt-8 pb-[176px]">
    <div
      class="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start"
    >
      <!-- Left: heading + tab list -->
      <div class="lg:col-span-4 flex flex-col gap-10">
        <div class="flex flex-col gap-[18px]">
          <p v-if="eyebrow" class="eyebrow m-0 !text-[var(--color-accent)]">
            {{ eyebrow }}
          </p>

          <h2
            class="m-0 font-display font-light text-[clamp(1.875rem,3.5vw,2rem)] leading-[1.12] tracking-[-0.005em] text-[var(--color-text)] text-balance"
          >
            {{ heading }}
          </h2>
        </div>

        <div
          role="tablist"
          class="flex flex-col border-b border-[var(--color-border)]"
        >
          <button
            v-for="(item, index) in items"
            :key="item.id"
            role="tab"
            :aria-selected="index === activeIndex"
            class="grid grid-cols-[112px_minmax(0,1fr)] items-baseline gap-4 w-full text-left py-[22px] border-0 border-t border-[var(--color-border)] bg-transparent cursor-pointer transition-colors duration-200"
            :class="
              index === activeIndex
                ? 'text-[var(--color-text)]'
                : 'text-[var(--color-text-light)]'
            "
            @click="selectTab(index)"
          >
            <span
              class="mono-sm font-mono transition-colors duration-200"
              :class="
                index === activeIndex
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-text-light)]'
              "
            >
              {{ item.period }}
            </span>

            <span class="font-display font-light text-2xl leading-[1.25]">
              {{ item.title }}
            </span>
          </button>
        </div>
      </div>

      <!-- Right: image + overlay card -->
      <div class="lg:col-span-7 lg:col-start-6">
        <Transition name="fade" mode="out-in">
          <div :key="activeItem.id" class="relative">
            <!-- Image -->
            <img
              v-if="imageUrl(activeItem)"
              :src="imageUrl(activeItem)!"
              :alt="activeItem.image?.alternativeText || activeItem.title"
              class="block w-full h-[560px] object-cover"
            />

            <!-- Placeholder khi chưa có ảnh -->
            <div
              v-else
              class="image-skeleton relative h-[560px] w-full overflow-hidden"
            >
              <div
                class="absolute left-4 bottom-3.5 flex items-center gap-2 font-display text-[11px] tracking-[0.14em] uppercase"
                style="color: #8a7359"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8A7359"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="1" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="M21 16l-5-5-9 8" />
                </svg>
                <span>{{ displayCaption(activeItem) }}</span>
              </div>
            </div>

            <!-- Overlay Card -->
            <div
              class="absolute -left-16 -bottom-12 hidden sm:flex w-[380px] max-w-[calc(100%-2rem)] flex-col gap-3.5 bg-[var(--color-bg-elevated)] px-8 pt-[30px] pb-7 shadow-[0_24px_48px_-28px_rgba(42,32,25,0.45)]"
            >
              <p class="mono-sm font-mono m-0 !text-[var(--color-accent)]">
                {{ activeItem.period }}
              </p>

              <p class="m-0 text-[17px] leading-[1.55]" style="color: #33261a">
                {{ activeItem.description }}
              </p>

              <NuxtLink
                v-if="activeItem.cta"
                :to="activeItem.cta.to"
                :target="activeItem.cta.newTab ? '_blank' : undefined"
                :rel="activeItem.cta.newTab ? 'noopener noreferrer' : undefined"
                class="group inline-flex items-center gap-2 text-sm font-medium tracking-[0.03em] text-[var(--color-text)]"
              >
                <span>{{ activeItem.cta.label }}</span>
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

            <!-- Mobile: card không absolute, xếp bên dưới ảnh -->
            <div
              class="flex sm:hidden flex-col gap-3.5 bg-[var(--color-bg-elevated)] p-6"
            >
              <p class="mono-sm font-mono m-0 !text-[var(--color-accent)]">
                {{ activeItem.period }}
              </p>
              <p class="m-0 text-[17px] leading-[1.55]" style="color: #33261a">
                {{ activeItem.description }}
              </p>
              <NuxtLink
                v-if="activeItem.cta"
                :to="activeItem.cta.to"
                :target="activeItem.cta.newTab ? '_blank' : undefined"
                :rel="activeItem.cta.newTab ? 'noopener noreferrer' : undefined"
                class="inline-flex items-center gap-2 text-sm font-medium tracking-[0.03em] text-[var(--color-text)]"
              >
                <span>{{ activeItem.cta.label }}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-medium);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
