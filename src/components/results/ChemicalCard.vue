<template>
  <div class="chemical-card">
    <div v-if="$slots.header" class="chemical-card__header">
      <slot name="header"></slot>
    </div>

    <div class="chemical-card__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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

  padding: $card-spacer-y $card-spacer-x;
}
</style>
