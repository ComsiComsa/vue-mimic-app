<template>
  <div
    :class="['app-alert', `app-alert--${variant}`]"
    role="alert"
    aria-live="polite"
  >
    <div class="app-alert__body">
      <div v-if="title" class="app-alert__title">
        <slot name="title">{{ title }}</slot>
      </div>

      <div class="app-alert__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type AlertVariant = 'negative'

interface Props {
  variant?: AlertVariant
  title?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'negative',
})
</script>

<style lang="scss" scoped>
.app-alert {
  --alert-bg: transparent;
  --alert-color: inherit;
  --alert-border-color: transparent;
  --alert-padding-x: 1rem;
  --alert-padding-y: 1rem;
  --alert-radius: .375rem;

  position: relative;
  padding: var(--alert-padding-y) var(--alert-padding-x);
  margin-bottom: 1rem;

  color: var(--alert-color);
  background-color: var(--alert-bg);
  border: 1px solid var(--alert-border-color);
  border-radius: var(--alert-radius);

  border-left-width: 4px;
  border-left-color: transparent;
}

.app-alert__body {
  display: grid;
  row-gap: .5rem;
}

.app-alert__title {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25rem;
  color: inherit;
}

.app-alert--negative {
  --alert-color: #dc3545;
  --alert-bg: #f8d7da;
  --alert-border-color: #f5c2c7;

  border-left-color: #dc3545;
}
</style>
