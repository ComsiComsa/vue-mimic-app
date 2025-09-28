import type { ChemicalProperties } from '@/types/results/ChemicalProperties.ts'
import type { LogKow } from '@/types/results/LogKow.ts'

export interface SubmitByCasResponse {
  chemicalProperties: ChemicalProperties
  logKow: LogKow
}
