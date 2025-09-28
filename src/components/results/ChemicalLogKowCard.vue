<template>
  <ChemicalMetricCard>
    <template #title>Log K<sub>OW</sub></template>
    <template #subtitle>Octanol-Water Partition Coefficient</template>

    <slot />
  </ChemicalMetricCard>
</template>

<script setup lang="ts">
import ChemicalMetricCard from '@/components/results/ChemicalMetricCard.vue'
</script>
