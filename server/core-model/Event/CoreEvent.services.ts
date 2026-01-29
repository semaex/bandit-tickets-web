import type { CoreEvent } from './CoreEvent'
import { coreEventFromCoreApiAdapter } from './CoreEvent.adapter'
import type { CoreEventJson } from './CoreEvent.adapter'
import { coreApiClient } from '../../api-client/core'
import type { Criteria } from '../../../shared/Criteria'
import { paginationAdapter, parsePaginated } from '../../../shared/Pagination'
import type { Paginated } from '../../../shared/Pagination'

const BASE_URL = '/api/v1/catalog/events'

function endpointWithQuery(path: string, criteria: Criteria): string {
  const params = criteria.toQueryParams()
  const search = new URLSearchParams(params).toString()
  return search ? `${path}?${search}` : path
}

export function findCoreEventById(id: string): Promise<CoreEvent> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CoreEventJson>(endpoint)
    .then(response => coreEventFromCoreApiAdapter(response))
}

export function findCoreEventBySlug(slug: string): Promise<CoreEvent> {
  const endpoint = `${BASE_URL}/by-slug/${slug}`
  return coreApiClient.get<CoreEventJson>(endpoint)
    .then(response => coreEventFromCoreApiAdapter(response))
}

export function searchEventsByPromoter(
  promoterId: string,
  criteria: Criteria
): Promise<Paginated<CoreEvent>> {
  const path = `${BASE_URL}/by-promoter/${promoterId}`
  const endpoint = endpointWithQuery(path, criteria)
  return coreApiClient.get<Record<string, unknown>>(endpoint)
    .then(data => {
      const json = parsePaginated<CoreEventJson>(data)
      return paginationAdapter(json, coreEventFromCoreApiAdapter)
    })
}

export function searchEventsByArtist(
  artistId: string,
  criteria: Criteria
): Promise<Paginated<CoreEvent>> {
  const path = `${BASE_URL}/by-artist/${artistId}`
  const endpoint = endpointWithQuery(path, criteria)
  return coreApiClient.get<Record<string, unknown>>(endpoint)
    .then(data => {
      const json = parsePaginated<CoreEventJson>(data)
      return paginationAdapter(json, coreEventFromCoreApiAdapter)
    })
}
