<template>
  <AppAlert :title="title" variant="negative">
    <p class="submit-error-alert__text">
      Could not process the provided chemical <strong>(CAS: {{ cas }})</strong>. For further assistance, please contact support
    </p>
  </AppAlert>
</template>

<script setup lang="ts">
import AppAlert from '@/components/ui/AppAlert.vue';

interface Props {
  cas: string | null
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Error',
})

</script>

<style scoped lang="scss">
.submit-error-alert {
  &__text {
    margin: 0;

    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #842029;
  }
}
</style>
