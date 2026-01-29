import type { CoreEvent } from '../../core-model/Event/CoreEvent'
import { findCoreVenuesByIds } from '../../core-model/Venue/CoreVenue.services'
import { findCoreTicketTypesByEvent } from '../../core-model/TicketType/CoreTicketType.services'
import { venueListViewFromCoreVenueSummaryAdapter } from '../../../public-model/Venue/VenueListView.adapter'
import type { VenueListView } from '../../../public-model/Venue/VenueListView'
import type { CoreTicketType } from '../../core-model/TicketType/CoreTicketType'

export interface AggregatedEventData {
  venueById: Map<string, VenueListView>
  ticketTypesByEventId: Map<string, CoreTicketType[]>
}

export async function aggregateEventData(events: CoreEvent[]): Promise<AggregatedEventData> {
  const venueIds = Array.from(new Set(
    events
      .map(e => e.venueId?.toString() ?? null)
      .filter((id): id is string => !!id)
  ))

  const venueSummaries = venueIds.length > 0
    ? await findCoreVenuesByIds(venueIds)
    : []

  const venues = venueSummaries.map(venueListViewFromCoreVenueSummaryAdapter)
  const venueById = new Map(venues.map(v => [v.id.toString(), v]))

  const ticketTypesByEventId = new Map<string, CoreTicketType[]>()
  await Promise.all(events.map(async (coreEvent) => {
    const ticketTypes = await findCoreTicketTypesByEvent(coreEvent.id.toString())
    ticketTypesByEventId.set(coreEvent.id.toString(), ticketTypes)
  }))

  return {
    venueById,
    ticketTypesByEventId
  }
}
