<template>
  <div class="container">
    <SubmitErrorAlert v-if="!isValid || isError" :cas="cas" />

    <AppOverlayLoader v-else-if="isLoading"> Loading ... </AppOverlayLoader>

    <ResultContent v-else-if="results" :results="results" />
  </div>
</template>

<script setup lang="ts">
import { useCasFromHash } from '@/composables/results/useCasFromHash.ts'
import { useResultsByCas } from '@/composables/results/useResultsByCas.ts'
import SubmitErrorAlert from '@/components/results/SubmitErrorAlert.vue'
import AppOverlayLoader from '@/components/ui/AppOverlayLoader.vue'
import ResultContent from '@/components/results/ResultContent.vue'

const { cas, isValid } = useCasFromHash()
const { results, isError, isLoading } = useResultsByCas(cas)
</script>

<style lang="scss" scoped></style>
