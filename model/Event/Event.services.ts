import type { Event } from './Event'
import { eventFromApiAdapter } from './Event.adapter'
import type { ApiEvent } from './Event.adapter'

export async function findEventBySlug(slug: string): Promise<Event> {
  return $fetch<{ event: ApiEvent }>(`/api/events/${slug}`).then((data: { event: ApiEvent }) => {
    return eventFromApiAdapter(data.event)
  })
}

