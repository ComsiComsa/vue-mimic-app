import type {
  EstimatedValue,
  ExperimentalValue,
  Factor,
  SelectedValue,
} from '@/types/results/common.ts'

export interface BoilingPointModel {
  factors: Factor[]
  boilingPointKelvinsUncorrected: number
  boilingPointKelvinsCorrected: number
  boilingPointCelsius: number
}

export interface BoilingPoint {
  estimatedValue: EstimatedValue<BoilingPointModel>
  experimentalValues: ExperimentalValue[]
  selectedValue: SelectedValue
}
