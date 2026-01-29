import type { CriteriaFilterOperator } from './CriteriaFilterOperator'

export interface CriteriaFilterPrimitive {
  field: string
  operator: string
  value: unknown
}

export class CriteriaFilter {
  constructor(
    public readonly field: string,
    public readonly operator: CriteriaFilterOperator,
    public readonly value: unknown
  ) {}

  static createEqual(field: string, value: unknown): CriteriaFilter {
    return new CriteriaFilter(field, '=' as CriteriaFilterOperator, value)
  }

  toPrimitive(): CriteriaFilterPrimitive {
    return {
      field: this.field,
      operator: this.operator,
      value: this.value
    }
  }
}
