<template>
  <div class="chemical-card">
    <div v-if="$slots.header" class="chemical-card__header">
      <slot name="header"></slot>
    </div>

    <div
      class="chemical-card__content"
      :class="{ 'chemical-card__content--flush': noContentPadding }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ noContentPadding?: boolean }>()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.chemical-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: $card-height;

  background-color: $card-bg;
  background-clip: border-box;

  border: $card-border-width solid $card-border-color;
  border-radius: $card-border-radius;

  box-shadow: $card-box-shadow;

  &__header {
    padding: 0.85rem 1rem;
  }

  &__content {
    padding: 1rem;

    &--flush {
      padding: 0;
    }
  }
}
</style>
