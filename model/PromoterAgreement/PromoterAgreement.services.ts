import type { PromoterAgreement } from './PromoterAgreement'
import type { ApiPromoterAgreement } from './PromoterAgreement.adapter'
import { promoterAgreementFromApiAdapter } from './PromoterAgreement.adapter'

export async function findPromoterAgreementById(id: string): Promise<PromoterAgreement> {
  return $fetch<{ promoterAgreement: ApiPromoterAgreement }>(`/api/promoter-agreements/${id}`).then(
    (data: { promoterAgreement: ApiPromoterAgreement }) => {
      return promoterAgreementFromApiAdapter(data.promoterAgreement)
    }
  )
}

