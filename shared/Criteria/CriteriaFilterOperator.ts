export const EQUAL = '='
export const NOT_EQUAL = '!='
export const GT = '>'
export const GTE = '>='
export const LT = '<'
export const LTE = '<='
export const CONTAINS = 'CONTAINS'
export const NOT_CONTAINS = 'NOT_CONTAINS'
export const LIKE = 'LIKE'
export const IN = 'IN'

export type CriteriaFilterOperator =
  | typeof CONTAINS
  | typeof EQUAL
  | typeof GT
  | typeof GTE
  | typeof LIKE
  | typeof LT
  | typeof LTE
  | typeof NOT_CONTAINS
  | typeof NOT_EQUAL
  | typeof IN
