import { coreApiClient } from '../../api-client/core'
import type { CorePromoterAgreement } from "./CorePromoterAgreement"
import { corePromoterAgreementFromJson, type CorePromoterAgreementJson } from "./CorePromoterAgreement.adapter"

const BASE_URL = '/api/v1/accounting/promoter-agreements'

export async function findCorePromoterAgreementById(id: string): Promise<CorePromoterAgreement> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CorePromoterAgreementJson>(endpoint)
    .then(response => corePromoterAgreementFromJson(response))
}

