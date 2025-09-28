<template>
  <ChemicalMetricCard>
    <template #title>MPBP</template>
    <template #subtitle>Melting Point and Boiling Point</template>

    <AppTabs :tabs="ChemicalMpBpTabsConfig" v-model="activeTab">
      <template #default="{ activeKey }">
        <div v-if="activeKey === ChemicalMpBpTabKey.SUMMARY" class="mpbp-card__summary">
          <div class="mpbp-card__aside">
            <div class="mpbp-card__item">
              <p class="mpbp-card__label">Experimental Melting Point</p>
              <p class="mpbp-card__value">
                {{ meltingPoint.selectedValue.value.toFixed(2) }} °C
              </p>
            </div>

            <div class="mpbp-card__item">
              <p class="mpbp-card__label">Estimated Boiling Point</p>
              <p class="mpbp-card__value">
                {{ boilingPoint.selectedValue.value.toExponential(2) }} °C
              </p>
            </div>
          </div>

          <AppTable :columns="ChemicalMpBpSummaryColumns" :rows="summaryRows" />
        </div>

        <div
          v-else-if="activeKey === ChemicalMpBpTabKey.DESCRIPTORS"
          class="mpbp-card__descriptors"
        >
          <h4 class="mpbp-card__title">Melting Point (Adapted Joback / Gold-Ogle Methods)</h4>

          <AppTable
            class="mpbp-card__table"
            :columns="ChemicalMpBpDescriptorsColumns"
            :rows="meltingRows"
          >
            <template #cell-coefficient="{ value }">
              {{ formatNumber(value) }}
            </template>
            <template #cell-contribution="{ value }">
              {{ formatNumber(value) }}
            </template>
          </AppTable>

          <h4 class="mpbp-card__title">Boiling Point (Adapted Stein and Brown Method)</h4>

          <AppTable
            class="mpbp-card__table"
            :columns="ChemicalMpBpDescriptorsColumns"
            :rows="boilingRows"
          >
            <template #cell-coefficient="{ value }">
              {{ formatNumber(value) }}
            </template>
            <template #cell-contribution="{ value }">
              {{ formatNumber(value) }}
            </template>
          </AppTable>
        </div>

        <div v-else-if="activeKey === ChemicalMpBpTabKey.ANALOGS">
          <AppButton label="Load AIM Analogs" />
        </div>

        <div v-else>Invalid tab</div>
      </template>
    </AppTabs>
  </ChemicalMetricCard>
</template>

<script setup lang="ts">
import ChemicalMetricCard from '@/components/results/ChemicalMetricCard.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import { ChemicalMpBpTabKey } from '@/types/results/ChemicalMpBpTabs.ts'
import { ref } from 'vue'
import { ChemicalMpBpTabsConfig } from '@/config/results/ChemicalMpBpTabsConfig.ts'
import AppButton from '@/components/ui/AppButton.vue'
import type { MeltingPoint } from '@/types/results/MeltingPoint.ts'
import type { BoilingPoint } from '@/types/results/BoilingPoint.ts'
import type { AppTableDataRow, AppTableRow } from '@/components/ui/AppTable.vue'
import AppTable from '@/components/ui/AppTable.vue'
import {
  ChemicalMpBpSummaryColumns,
  ChemicalMpBpDescriptorsColumns,
} from '@/config/results/ChemicalMpBpTables.ts'

const activeTab = ref<ChemicalMpBpTabKey>(ChemicalMpBpTabKey.SUMMARY)

const props = defineProps<{ meltingPoint: MeltingPoint; boilingPoint: BoilingPoint }>()

const formatNumber = (n: unknown, digits = 2) => (typeof n === 'number' ? n.toFixed(digits) : n)

const formatExponential = (n: number, digits = 2) => n.toExponential(digits)

const degSymbol = '°C'
const kelvinSymbol = '°K'

const meltingData: AppTableDataRow[] = props.meltingPoint.estimatedValue.model.factors.map((f) => ({
  kind: 'data',
  data: {
    type: f.type,
    description: f.description,
    fragmentCount: f.fragmentCount,
    coefficient: f.coefficient,
    contribution: f.totalCoefficient,
  },
}))

const summaryRows: AppTableRow[] = [
  {
    kind: 'data',
    data: {
      metric: 'Melting Point',
      estimated: props.meltingPoint.estimatedValue.value.toFixed(2),
      experimental: props.meltingPoint.experimentalValues.map((e) => e.value.toFixed(2)).join(', '),
      references: props.meltingPoint.experimentalValues
        .map((e) => `${e.author} (${e.year})`)
        .join('; '),
    },
  },
  {
    kind: 'data',
    data: {
      metric: 'Boiling Point',
      estimated: props.boilingPoint.estimatedValue.value.toExponential(2),
      experimental: props.boilingPoint.experimentalValues
        .map((e) => e.value.toExponential(2))
        .join(', '),
      references: props.boilingPoint.experimentalValues
        .map((e) => `${e.author} (${e.year})`)
        .join('; '),
    },
  },
]

const meltingSummary: AppTableRow[] = [
  {
    kind: 'summary',
    label: 'Adapted Joback',
    value: `${formatNumber(props.meltingPoint.estimatedValue.model.meltingPointAdaptedJoback)} ${degSymbol}`,
  },
  {
    kind: 'summary',
    label: 'Gold-Ogle',
    value: `${formatExponential(props.meltingPoint.estimatedValue.model.meltingPointGoldOgle)} ${degSymbol}`,
  },
  {
    kind: 'summary',
    label: 'Mean Value',
    value: `${formatExponential(props.meltingPoint.estimatedValue.model.meltingPointMean)} ${degSymbol}`,
  },
  {
    kind: 'summary',
    label: 'Selected Melting Point (Weighted Mean)',
    value: `${formatNumber(props.meltingPoint.estimatedValue.model.meltingPointSelected)} ${degSymbol}`,
  },
]

const meltingRows: AppTableRow[] = [...meltingData, ...meltingSummary]

const boilingRows: AppTableRow[] = [
  ...(props.boilingPoint.estimatedValue.model.factors.map((f) => ({
    kind: 'data',
    data: {
      type: f.type,
      description: f.description,
      fragmentCount: f.fragmentCount,
      coefficient: f.coefficient,
      contribution: f.totalCoefficient,
    },
  })) as AppTableDataRow[]),
  {
    kind: 'summary',
    label: 'Uncorrected Value',
    value: `${formatExponential(props.boilingPoint.estimatedValue.model.boilingPointKelvinsUncorrected)} ${kelvinSymbol}`,
  },
  {
    kind: 'summary',
    label: 'Corrected Value',
    value: `${formatExponential(props.boilingPoint.estimatedValue.model.boilingPointKelvinsCorrected)} ${kelvinSymbol}`,
  },
  {
    kind: 'summary',
    label: 'Boiling Point',
    value: `${formatExponential(props.boilingPoint.estimatedValue.model.boilingPointCelsius)} ${degSymbol}`,
  },
]
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use 'sass:map';

.mpbp-card {
  &__descriptors {
    display: flex;
    flex-direction: column;
  }

  &__table {
    margin-bottom: 2rem;
  }

  &__title {
    margin-bottom: 0.5rem;

    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #185394;
  }

  &__summary {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 1rem;
    align-items: start;
  }

  &__aside {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    color: #595959;
    margin: 0;
  }

  &__value {
    font-size: 20px;
    font-weight: 700;
    color: #185394;
    margin: 0;
  }

  @media (max-width: map.get($breakpoints, md)) {
    &__summary {
      grid-template-columns: 1fr;
    }

    &__aside {
      order: -1;
    }
  }
}
</style>
