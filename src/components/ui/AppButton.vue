<template>
  <button type="button" class="app-button" :class="[`app-button--${theme}`]">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    theme?: 'primary'
  }>(),
  {
    theme: 'primary',
  },
)
</script>

<style scoped lang="scss">
.app-button {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &--primary {
    color: #fff;
    background-color: #185394;
    border-color: #185394;

    &:hover {
      background-color: #14477e;
      border-color: #134276;
    }

    &:active {
      background-color: #134276;
      border-color: #123e6f;
      box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(59, 109, 164, 0.5);
    }

    &:disabled {
      background-color: #185394;
      border-color: #185394;
    }
  }
}
</style>
