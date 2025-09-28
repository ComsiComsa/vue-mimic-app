<template>
  <ChemicalMetricCard>
    <template #title>MPBP</template>
    <template #subtitle>Melting Point and Boiling Point</template>

    <slot />
  </ChemicalMetricCard>
</template>

<script setup lang="ts">
import ChemicalMetricCard from '@/components/results/ChemicalMetricCard.vue'
</script>
