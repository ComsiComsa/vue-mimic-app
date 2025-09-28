type LogKowFactorType = 'Fragment' | 'Factor' | 'Constant'
type LogKowValueType = 'ESTIMATED' | 'EXPERIMENTAL'

interface LogKowFactor {
  type: LogKowFactorType
  description: string
  fragmentCount: number
  coefficient: number
  contribution: number
  trainingCount: number
  validationCount: number
}

interface LogKowModelFlags {
  isOrganicAcid: boolean
  isAminoAcid: boolean
}

interface LogKowModel {
  logKow: number
  factors: LogKowFactor[]
  output: string
  notes: string
  flags: LogKowModelFlags
}

interface LogKowEstimatedValue {
  model: LogKowModel
  value: number
  units: string | null | ''
  valueType: Extract<LogKowValueType, 'ESTIMATED'>
}

interface LogKowExperimentalValue {
  author: string
  year: number
  order: number
  value: number
  units: string | null
  valueType: Extract<LogKowValueType, 'EXPERIMENTAL'>
}

interface LogKowSelectedValue {
  value: number
  units: string | null
  valueType: LogKowValueType
}

export interface LogKow {
  parameters: {
    smiles: string
    cas: string
  }
  estimatedValue: LogKowEstimatedValue
  experimentalValues: LogKowExperimentalValue[]
  selectedValue: LogKowSelectedValue
}
