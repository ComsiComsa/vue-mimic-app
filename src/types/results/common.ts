export type ValueType = 'ESTIMATED' | 'EXPERIMENTAL'
export type TemperatureUnit = 'celsius'

export interface Factor {
  type: string
  description: string
  fragmentCount: number
  coefficient: number
  totalCoefficient: number
}

export interface ExperimentalValue<U extends string = TemperatureUnit> {
  author: string
  year: number
  order: number
  value: number
  units: U | null
  valueType: 'EXPERIMENTAL'
}

export interface EstimatedValue<TModel, U extends string = TemperatureUnit> {
  model: TModel
  value: number
  units: U
  valueType: 'ESTIMATED'
}

export interface SelectedValue<U extends string = TemperatureUnit> {
  value: number
  units: U | null
  valueType: ValueType
}
