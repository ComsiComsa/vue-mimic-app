<template>
  <main class="app-layout">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.app-layout {
  height: 100%;

  padding-top: $gutter-y;
  padding-bottom: $gutter-y;
}
</style>
