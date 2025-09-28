<template>
  <ChemicalMetricCard class="logkow-card">
    <template #title>Log K<sub>OW</sub></template>
    <template #subtitle>Octanol-Water Partition Coefficient</template>

    <AppTabs :tabs="ChemicalTabsConfig" v-model="active">
      <template #default="{ activeKey }">
        <div v-if="activeKey === ChemicalTabKey.SUMMARY" class="logkow-card__summary">
          <div class="logkow-card__aside">
            <div class="logkow-card__aside-label">Experimental Log K<sub>OW</sub></div>
            <div class="logkow-card__aside-value">{{ experimentalBest }}</div>
          </div>

          <div class="logkow-card__table">
            <AppTable :columns="ChemicalLogKowSummaryColumns" :rows="summaryRows">
              <template #cell-metric="{ value }">
                <span v-html="value" />
              </template>
            </AppTable>
          </div>
        </div>

        <AppTable
          v-else-if="activeKey === ChemicalTabKey.DESCRIPTORS"
          :columns="ChemicalLogKowDescriptorsColumns"
          :rows="rows"
        >
          <template #cell-coefficient="{ value }">
            {{ typeof value === 'number' ? value.toFixed(2) : value }}
          </template>
          <template #cell-contribution="{ value }">
            {{ typeof value === 'number' ? value.toFixed(4) : '' }}
          </template>
        </AppTable>

        <div v-else-if="activeKey === ChemicalTabKey.OUTPUT" class="logkow-card__output">
          <pre>{{ logKow.estimatedValue.model.output }}</pre>
        </div>

        <div v-else-if="activeKey === ChemicalTabKey.ANALOGS">
          <AppButton label="Load AIM Analogs" />
        </div>

        <div v-else>Invalid tab</div>
      </template>
    </AppTabs>
  </ChemicalMetricCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChemicalTabsConfig } from '@/config/results/ChemicalTabsConfig.ts'
import { ChemicalTabKey } from '@/types/results/ChemicalLogKowTabs.ts'
import {
  ChemicalLogKowDescriptorsColumns,
  ChemicalLogKowSummaryColumns,
} from '@/config/results/ChemicalLogKowTables.ts'
import type { LogKow } from '@/types/results/LogKow.ts'

import ChemicalMetricCard from '@/components/results/ChemicalMetricCard.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import AppTable, { type AppTableDataRow, type AppTableRow } from '@/components/ui/AppTable.vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps<{ logKow: LogKow }>()

const active = ref<ChemicalTabKey>(ChemicalTabKey.SUMMARY)

const dataRows: AppTableDataRow[] = props.logKow.estimatedValue.model.factors.map((f) => ({
  kind: 'data',
  data: {
    type: f.type,
    description: f.description,
    fragmentCount: f.fragmentCount,
    coefficient: f.coefficient,
    contribution: f.contribution,
    trainingCount: f.trainingCount,
    validationCount: f.validationCount,
  },
}))

const rows: AppTableRow[] = [
  ...dataRows,
  {
    kind: 'summary',
    label: 'Log K<sub>OW</sub>',
    value: props.logKow.estimatedValue.model.logKow.toFixed(2),
  },
]

const experimentalValuesStr = computed(() =>
  (props.logKow.experimentalValues ?? []).map((item) => item.value.toFixed(2)).join(', '),
)

const referencesStr = computed(() =>
  (props.logKow.experimentalValues ?? []).map((v) => `${v.author} (${v.year})`).join(', '),
)

const estimatedStr = computed(() => {
  const n = props.logKow.estimatedValue?.model?.logKow ?? props.logKow.estimatedValue?.value
  return typeof n === 'number' ? n.toFixed(2) : ''
})

const experimentalBest = computed(() => {
  const n = props.logKow.selectedValue?.value ?? props.logKow.experimentalValues?.[0]?.value
  return typeof n === 'number' ? n.toFixed(2) : ''
})

const summaryRows: AppTableRow[] = [
  {
    kind: 'data',
    data: {
      metric: 'Log K<sub>OW</sub>',
      estimated: estimatedStr.value,
      experimental: experimentalValuesStr.value,
      references: referencesStr.value,
    },
  } as AppTableDataRow,
]
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use 'sass:map';

.logkow-card {
  &__summary {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 1rem;
    align-items: start;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0;
  }

  &__aside-label {
    color: #595959;
    font-size: 14px;
    line-height: 21px;
  }

  &__aside-value {
    color: #185394;
    font-weight: 800;
    font-size: 28px;
    line-height: 32px;
  }

  &__table {
    min-width: 0;
  }

  &__output {
    font-family:
      SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #3d4551;
    white-space: pre;
    overflow-x: auto;
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    margin: 0;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
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
