import type { CoreEvent } from './CoreEvent'
import { coreEventFromCoreApiAdapter } from './CoreEvent.adapter'
import type { CoreEventJson } from './CoreEvent.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/catalog/events'

export function findCoreEventBySlug(slug: string): Promise<CoreEvent> {
  const endpoint = `${BASE_URL}/by-slug/${slug}`
  return coreApiClient.get<CoreEventJson>(endpoint)
    .then(response => coreEventFromCoreApiAdapter(response))
}
