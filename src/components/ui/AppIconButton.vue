<template>
  <button class="app-icon-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  border-radius: 8px;

  background: #fff;
  color: #212529;
  border: 1px solid #e5e7eb;

  cursor: pointer;
  transition: background-color .15s ease-in-out,
    color .15s ease-in-out,
    border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;

  &:hover,
  &:focus-visible {
    background: #212529;
    color: #fff;
    border-color: #212529;
    box-shadow: 0 0 0 3px rgba(33,37,41,.15);
    outline: none;
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
}
</style>
