<template>
  <div class="app-tabs">
    <div class="app-tabs__list" role="tablist" ref="listEl">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.key"
        :ref="(el) => (tabRefs[i] = el as HTMLElement)"
        class="app-tabs__btn"
        role="tab"
        type="button"
        :aria-selected="tab.key === currentTab"
        :tabindex="tab.key === currentTab ? 0 : -1"
        @click="setActive(tab.key)"
      >
        {{ tab.label }}
      </button>

      <div class="app-tabs__indicator" :style="indicatorStyle" />
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="renderKey" class="app-tabs__panel" role="tabpanel" :key="renderKey">
        <slot :activeKey="currentTab" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface TabItem {
  key: string
  label: string
}

const props = defineProps<{ tabs: TabItem[]; modelValue?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

let resizeObserver: ResizeObserver | null = null

const currentTab = ref(props.modelValue ?? props.tabs[0]?.key ?? '')
const listEl = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])

const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const renderKey = computed(() => currentTab.value)
const indicatorStyle = computed(() => ({
  transform: `translateX(${indicatorLeft.value}px)`,
  width: `${indicatorWidth.value}px`,
}))

const setActive = (key: string): void => {
  if (key === currentTab.value) {
    return
  }

  currentTab.value = key
  emit('update:modelValue', key)
  nextTick(updateIndicator)
}

const updateIndicator = (): void => {
  const list = listEl.value

  if (!list) {
    return
  }

  const idx = props.tabs.findIndex((t) => t.key === currentTab.value)
  const el = tabRefs.value[idx]

  if (!el) {
    return
  }

  const listRect = list.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  indicatorLeft.value = elRect.left - listRect.left + list.scrollLeft
  indicatorWidth.value = elRect.width
}

onMounted(() => {
  resizeObserver = new ResizeObserver(updateIndicator)

  if (listEl.value) {
    resizeObserver.observe(listEl.value)
  }

  window.addEventListener('resize', updateIndicator)
  nextTick(updateIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator)
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(currentTab, () => nextTick(updateIndicator))
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue !== currentTab.value) currentTab.value = newValue
  },
)
</script>

<style scoped lang="scss">
.app-tabs {
  width: 100%;

  &__list {
    position: relative;
    display: flex;

    padding: 0 0.25rem;

    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;

    border-bottom: 1px solid #e5e7eb;
  }

  &__btn {
    position: relative;
    flex: 0 0 auto;

    margin: 0 0 -1px 0;
    padding: 0.25rem 0.75rem;

    appearance: none;
    background: transparent;
    border: 0;

    font: inherit;
    color: #1f2937;
    cursor: pointer;
    white-space: nowrap;

    border-top: 3px solid transparent !important;
    border-bottom: 3px solid transparent;
    text-decoration: none;

    &:hover {
      border-bottom-color: rgba(24, 83, 148, 0.25);
    }

    &:focus-visible {
      outline: none;
      border-bottom-color: rgba(24, 83, 148, 0.25);
    }

    &[aria-selected='true'] {
      color: #185394;
    }

    transition:
      border-color 0.2s ease,
      color 0.2s ease;
  }

  &__indicator {
    position: absolute;
    height: 3px;
    bottom: -1px;
    background: #185394;
    border-radius: 2px;
    transition:
      transform 0.25s ease,
      width 0.25s ease;
    will-change: transform, width;
  }

  &__panel {
    padding: 1rem;

    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
