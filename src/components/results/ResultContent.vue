<template>
  <div class="result-content">
    <div class="result-content__sidebar">
      <ChemicalCard> Card 1 </ChemicalCard>
    </div>

    <div class="result-content__main">
      <ChemicalCard> Card 2 </ChemicalCard>

      <ChemicalCard> Card 3 </ChemicalCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChemicalCard from '@/components/results/ChemicalCard.vue'
import type { SubmitByCasResponse } from '@/types/api/SubmitByCas.ts'

defineProps<{
  results: SubmitByCasResponse
}>()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use 'sass:map';

.result-content {
  display: flex;
  flex-direction: column;
  gap: $gutter-y $gutter-x;

  &__sidebar,
  &__main {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: $gutter-y;
  }

  @media (min-width: map.get($breakpoints, lg)) {
    flex-direction: row;

    &__sidebar {
      flex: 0 0 auto;
      max-width: 33.3333%;
    }

    &__main {
      flex: 0 0 auto;
      max-width: 66.6667%;
    }
  }
}
</style>
