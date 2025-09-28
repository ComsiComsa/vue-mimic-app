<template>
  <ChemicalMetricCard class="logkow-card">
    <template #title>Log K<sub>OW</sub></template>
    <template #subtitle>Octanol-Water Partition Coefficient</template>

    <AppTabs :tabs="ChemicalTabsConfig" v-model="active">
      <template #default="{ activeKey }">
        <div v-if="activeKey === ChemicalTabKey.SUMMARY">111</div>

        <AppTable
          v-else-if="activeKey === ChemicalTabKey.DESCRIPTORS"
          :columns="columns"
          :rows="rows"
        >
          <template #cell-coefficient="{ value }">
            {{ typeof value === 'number' ? value.toFixed(2) : value }}
          </template>

          <template #cell-contribution="{ value }">
            {{ typeof value === 'number' ? value.toFixed(4) : '' }}
          </template>

          <template #footer>
            <tr>
              <th>Log K<sub>OW</sub></th>
              <td colspan="6" class="is-end">
                {{ logKow.estimatedValue.model.logKow.toFixed(2) }}
              </td>
            </tr>
          </template>
        </AppTable>

        <div v-else-if="activeKey === ChemicalTabKey.OUTPUT" class="logkow-card__output">
          <pre>{{ logKow.estimatedValue.model.output }}</pre>
        </div>

        <div v-else-if="activeKey === ChemicalTabKey.ANALOGS">444</div>

        <div v-else>Invalid tab</div>
      </template>
    </AppTabs>
  </ChemicalMetricCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChemicalTabsConfig } from '@/config/results/ChemicalTabsConfig.ts'
import { ChemicalTabKey } from '@/types/results/ChemicalLogKowTabs.ts'
import type { LogKow } from '@/types/results/LogKow.ts'

import ChemicalMetricCard from '@/components/results/ChemicalMetricCard.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import AppTable from '@/components/ui/AppTable.vue'

const props = defineProps<{ logKow: LogKow }>()

const active = ref<ChemicalTabKey>(ChemicalTabKey.SUMMARY)

const columns = [
  { key: 'type', label: 'Value' },
  { key: 'description', label: 'Description' },
  { key: 'fragmentCount', label: 'Number', align: 'end' },
  { key: 'coefficient', label: 'Coefficient', align: 'end' },
  { key: 'contribution', label: 'Contribution', align: 'end' },
  { key: 'trainingCount', label: 'Training Count', align: 'end' },
  { key: 'validationCount', label: 'Validation Count', align: 'end' },
]

const dataRows = props.logKow.estimatedValue.model.factors.map((f) => ({
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

const rows = [
  ...dataRows,
  {
    kind: 'summary',
    label: 'Log K<sub>OW</sub>',
    value: props.logKow.estimatedValue.model.logKow.toFixed(2),
  },
]
</script>

<style scoped lang="scss">
.logkow-card {
  &__output {
    font-family: Menlo, monospace;
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
}
</style>
