import { Uuid } from '../../../shared/Uuid'
import { CorePaymentGatewayStatus } from './CorePaymentGatewayStatus'
import { PaymentGatewayProvider } from '../../../shared/PaymentGatewayProvider'

export class CorePaymentGateway {
  constructor(
    public readonly id: Uuid,
    public readonly provider: PaymentGatewayProvider,
    public readonly description: string,
    public readonly settings: Record<string, any>,
    public readonly secretRef: string,
    public readonly status: CorePaymentGatewayStatus,
    public readonly createdAt: Date,
    public readonly archivedAt: Date | null
  ) {}
}
