import type {
  EstimatedValue,
  ExperimentalValue,
  Factor,
  SelectedValue,
} from '@/types/results/common.ts'

export interface MeltingPointModel {
  factors: Factor[]
  meltingPointKelvins: number
  meltingPointLimitKelvins: number
  meltingPointCelsius: number
  meltingPointAdaptedJoback: number
  meltingPointGoldOgle: number
  meltingPointMean: number
  meltingPointSelected: number
}

export interface MeltingPoint {
  estimatedValue: EstimatedValue<MeltingPointModel>
  experimentalValues: ExperimentalValue[]
  selectedValue: SelectedValue
}
