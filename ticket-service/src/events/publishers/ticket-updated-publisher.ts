import { Publisher, Subjects, TicketUpdatedEvent } from '@caltickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
