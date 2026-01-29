/**
 * Paginated collection: items + meta. Same type for API, in-memory, or any source.
 */
export interface Paginated<T> {
  items: T[]
  total: number
  perPage: number | null
  currentPage: number | null
  lastPage: number | null
  from: number | null
  to: number | null
}

/**
 * Takes a Paginated<T> and maps items to get Paginated<R>. Meta is preserved.
 */
export function paginationAdapter<T, R>(
  source: Paginated<T>,
  mapItem: (item: T) => R
): Paginated<R> {
  return {
    items: source.items.map(mapItem),
    total: source.total,
    perPage: source.perPage,
    currentPage: source.currentPage,
    lastPage: source.lastPage,
    from: source.from,
    to: source.to
  }
}

/**
 * Parse raw data (e.g. from API) into Paginated<T>. Use with paginationAdapter to map items.
 */
export function parsePaginated<T>(data: Record<string, unknown>): Paginated<T> {
  return {
    items: (data.items ?? []) as T[],
    total: (data.total as number) ?? 0,
    perPage: (data.perPage as number | null) ?? null,
    currentPage: (data.currentPage as number | null) ?? null,
    lastPage: (data.lastPage as number | null) ?? null,
    from: (data.from as number | null) ?? null,
    to: (data.to as number | null) ?? null
  }
}
