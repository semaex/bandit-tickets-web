import type { CriteriaFilter } from './CriteriaFilter'
import type { CriteriaOrder } from './CriteriaOrder'

export interface CriteriaPrimitive {
  filters: Array<{ field: string; operator: string; value: unknown }>
  order: string | null
  offset: number | null
  limit: number | null
}

export class Criteria {
  constructor(
    public readonly filters: CriteriaFilter[],
    public readonly order: CriteriaOrder | null = null,
    public readonly offset: number | null = null,
    public readonly limit: number | null = null
  ) {}

  hasFilters(): boolean {
    return this.filters.length > 0
  }

  hasOrder(): boolean {
    return this.order !== null && !this.order.isNone()
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {}
    if (this.filters.length > 0) {
      params.filters = JSON.stringify(
        this.filters.map((f) => ({ field: f.field, operator: f.operator, value: f.value }))
      )
    }
    if (this.hasOrder()) {
      params.order = this.order!.toString()
    }
    if (this.offset !== null && this.offset !== undefined) {
      params.offset = String(this.offset)
    }
    if (this.limit !== null && this.limit !== undefined) {
      params.limit = String(this.limit)
    }
    return params
  }
}
