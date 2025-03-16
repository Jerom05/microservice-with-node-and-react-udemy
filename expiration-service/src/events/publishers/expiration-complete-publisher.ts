import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent
} from '@caltickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
