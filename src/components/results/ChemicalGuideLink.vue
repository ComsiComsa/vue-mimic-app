<template>
  <a class="guide-link">
    User Guide
    <AppCircleInfo width="16px" height="16px" />
  </a>
</template>

<script setup lang="ts">
import AppCircleInfo from '@/components/icons/AppCircleInfo.vue'
</script>

<style scoped lang="scss">
.guide-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #134276;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
