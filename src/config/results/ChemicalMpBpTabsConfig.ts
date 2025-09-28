import { ChemicalMpBpTabKey } from '@/types/results/ChemicalMpBpTabs.ts'
import type { AppTableColumn } from '@/components/ui/AppTable.vue'

export const ChemicalMpBpTabsConfig: AppTableColumn[] = [
  { key: ChemicalMpBpTabKey.SUMMARY, label: 'Summary' },
  { key: ChemicalMpBpTabKey.DESCRIPTORS, label: 'Model Descriptors' },
  { key: ChemicalMpBpTabKey.ANALOGS, label: 'AIM Analogs' },
]
