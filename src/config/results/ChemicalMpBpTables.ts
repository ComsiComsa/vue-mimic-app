import type { AppTableColumn } from '@/components/ui/AppTable.vue'

export const ChemicalMpBpDescriptorsColumns: AppTableColumn[] = [
  { key: 'type', label: 'Value' },
  { key: 'description', label: 'Description' },
  { key: 'fragmentCount', label: 'Number', align: 'end' },
  { key: 'coefficient', label: 'Coefficient', align: 'end' },
  { key: 'contribution', label: 'Contribution', align: 'end' },
]

export const ChemicalMpBpSummaryColumns: AppTableColumn[] = [
  { key: 'metric', label: '' },
  { key: 'estimated', label: 'Estimated Value', align: 'end' },
  { key: 'experimental', label: 'Experimental Values', align: 'end' },
  { key: 'references', label: 'References' },
]
