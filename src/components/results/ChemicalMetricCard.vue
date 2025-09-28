<template>
  <ChemicalCard>
    <template #header>
      <div class="card-header">
        <div class="card-header__block">
          <h3 class="card-header__title"><slot name="title" /></h3>

          <p v-if="$slots.subtitle" class="card-header__subtitle">
            <slot name="subtitle" />
          </p>
        </div>

        <div class="card-header__actions">
          <ChemicalGuideLink />
        </div>
      </div>
    </template>

    <template #content>
      <slot />
    </template>
  </ChemicalCard>
</template>

<script setup lang="ts">
import ChemicalCard from '@/components/results/ChemicalCard.vue'
import ChemicalGuideLink from '@/components/results/ChemicalGuideLink.vue'
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;

  &__block {
    display: flex;
    align-items: center;
    gap: .25rem;
  }

  &__title {
    margin: 0;

    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #185394;
  }

  &__subtitle {
    margin: 0;

    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    color: #595959;
  }
}
</style>
