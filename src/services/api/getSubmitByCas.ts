import { EXTERNAL_API } from '@/config/api.ts'
import { SearchParam } from '@/types/api/SearchParam.ts'
import type { SubmitByCasResponse } from '@/types/api/SubmitByCas.ts'

export const getSubmitByCas = async (
  cas: string,
  signal?: AbortSignal,
): Promise<SubmitByCasResponse> => {
  const url = new URL(EXTERNAL_API.BASE_URL + '/submit')

  if (cas) {
    url.searchParams.set(SearchParam.CAS_KEY, cas)
  }

  const response = await fetch(url.toString(), { signal })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json()
}
