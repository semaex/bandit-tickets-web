import { CorePaymentGateway } from './CorePaymentGateway'
import { CorePaymentGatewayStatus } from './CorePaymentGatewayStatus'
import { PaymentGatewayProvider } from '../../../shared/PaymentGatewayProvider'
import { Uuid } from '../../../shared/Uuid'

export interface CorePaymentGatewayJson {
  id: string
  provider: string
  description: string
  settings: Record<string, any>
  secretRef: string
  status: string
  createdAt: string
  archivedAt: string | null
}

export function corePaymentGatewayFromJson(json: CorePaymentGatewayJson): CorePaymentGateway {
  return new CorePaymentGateway(
    Uuid.fromString(json.id),
    json.provider as PaymentGatewayProvider,
    json.description,
    json.settings,
    json.secretRef,
    json.status as CorePaymentGatewayStatus,
    new Date(json.createdAt),
    json.archivedAt ? new Date(json.archivedAt) : null
  )
}
