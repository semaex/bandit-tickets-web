export const ASC = 'asc'
export const DESC = 'desc'

export type CriteriaOrderDirection = typeof ASC | typeof DESC

export class CriteriaOrder {
  constructor(
    public readonly field: string,
    public readonly direction: CriteriaOrderDirection = DESC
  ) {}

  static createAsc(field: string): CriteriaOrder {
    return new CriteriaOrder(field, ASC)
  }

  static createDesc(field: string): CriteriaOrder {
    return new CriteriaOrder(field, DESC)
  }

  toString(): string {
    return `${this.field} ${this.direction}`
  }

  isNone(): boolean {
    return !this.field || !this.direction
  }
}
