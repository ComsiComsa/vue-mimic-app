<template>
  <div class="result-content">
    <div class="result-content__sidebar">
      <ChemicalSummaryCard :properties="results.chemicalProperties">
        <template #actions>
          <AppIconButton variant="dark">
            <AppDownloadIcon width="14px" height="14px" />
          </AppIconButton>
        </template>
      </ChemicalSummaryCard>
    </div>

    <div class="result-content__main">
      <ChemicalLogKowCard :log-kow="results.logKow" />
      <ChemicalMpbpCard
        :melting-point="results.meltingPoint"
        :boiling-point="results.boilingPoint"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubmitByCasResponse } from '@/types/api/SubmitByCas.ts'
import AppDownloadIcon from '@/components/icons/AppDownloadIcon.vue'
import AppIconButton from '@/components/ui/AppIconButton.vue'
import ChemicalSummaryCard from '@/components/results/ChemicalSummaryCard.vue'
import ChemicalLogKowCard from '@/components/results/ChemicalLogKowCard.vue'
import ChemicalMpbpCard from '@/components/results/ChemicalMpbpCard.vue'

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
