<!-- src/components/ui/AppOverlayLoader.vue -->
<template>
  <teleport to="body">
    <div class="app-overlay-loader" role="status" aria-live="polite">
      <div class="app-overlay-loader__backdrop" />

      <div class="app-overlay-loader__center">
        <div class="app-overlay-loader__spinner" />

        <div v-if="$slots.default" class="app-overlay-loader__text">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-overlay-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;

  &__backdrop,
  &__center {
    position: absolute;
    inset: 0;
  }

  &__backdrop {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
  }

  &__center {
    display: grid;
    gap: 12px;
    place-items: center;
    align-content: center;
    justify-content: center;

    color: #254a7b;
  }

  &__text {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;

    color: #e5eaf2;
  }

  &__spinner {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 3px solid rgba(37, 74, 123, 0.25);
    border-top-color: #254a7b;

    animation: appOverlaySpin 0.9s linear infinite;
  }
}

@keyframes appOverlaySpin {
  to {
    transform: rotate(360deg);
  }
}
</style>
