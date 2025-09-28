import type { ChemicalProperties } from '@/types/results/ChemicalProperties.ts'
import type { LogKow } from '@/types/results/LogKow.ts'
import type { MeltingPoint } from '@/types/results/MeltingPoint.ts'
import type { BoilingPoint } from '@/types/results/BoilingPoint.ts'

export interface SubmitByCasResponse {
  chemicalProperties: ChemicalProperties
  logKow: LogKow
  meltingPoint: MeltingPoint
  boilingPoint: BoilingPoint
}
