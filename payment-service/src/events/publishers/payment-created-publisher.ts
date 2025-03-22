import { Subjects, Publisher, PaymentCreatedEvent } from '@caltickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}
