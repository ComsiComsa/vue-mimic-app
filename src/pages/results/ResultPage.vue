<template>
  <div class="container">
    {{ cas }} - {{ isValid }}
  </div>
</template>

<script setup lang="ts">

import { useCasFromHash } from '@/composables/results/useCasFromHash.ts'

const { cas, isValid } = useCasFromHash();
</script>

<style scoped>
</style>
