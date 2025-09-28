<template>
  <ChemicalCard>
    <template #header>
      <div class="chemical-summary-card__header">
        <a class="chemical-summary-card__title">{{ properties.name }}</a>

        <div class="chemical-summary-card__actions">
          <slot name="actions" />
        </div>
      </div>
    </template>

    <template #content>
      <div class="chemical-summary-card__content">
        <div class="chemical-summary-card__row">
          <img
            v-if="imgSrc"
            class="chemical-summary-card__image"
            :src="imgSrc"
            alt="Chemical structure"
          />
        </div>

        <div class="chemical-summary-card__row">
          <p class="chemical-summary-card__row-title">Systematic Name</p>
          <p class="chemical-summary-card__row-description">
            {{ properties.systematicName || 'N/A' }}
          </p>
        </div>

        <div class="chemical-summary-card__row">
          <p class="chemical-summary-card__row-title">CAS RN</p>
          <p class="chemical-summary-card__row-description">{{ properties.cas }}</p>
        </div>

        <div class="chemical-summary-card__row">
          <p class="chemical-summary-card__row-title">Molecular Formula</p>
          <p class="chemical-summary-card__row-description" v-html="properties.molecularFormulaHtml" />
        </div>

        <div class="chemical-summary-card__row">
          <p class="chemical-summary-card__row-title">Molecular Mass</p>
          <p class="chemical-summary-card__row-description">
            {{ properties.molecularWeight }}
          </p>
        </div>

        <div class="chemical-summary-card__row">
          <p class="chemical-summary-card__row-title">Smiles</p>
          <p class="chemical-summary-card__row-description">{{ properties.smiles }}</p>
        </div>
      </div>
    </template>
  </ChemicalCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChemicalCard from '@/components/results/ChemicalCard.vue'
import { getChemicalImageUrl } from '@/utils/results/getChemicalImageUrl'
import type { ChemicalProperties } from '@/types/results/ChemicalProperties.ts'

const props = defineProps<{ properties: ChemicalProperties }>()

const imgSrc = computed(() => getChemicalImageUrl(props.properties?.smiles))
</script>

<style scoped lang="scss">
.chemical-summary-card {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    text-decoration: none;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #134276;

    &:hover,
    &:focus,
    &:active {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__actions {
    display: inline-flex;
    gap: 8px;
  }

  &__image {
    height: 200px;
    max-width: 75%;
  }

  &__row {
    margin-bottom: 1rem;
  }

  &__row-title {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #595959;
  }

  &__row-description {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #3d4551;
  }
}
</style>
