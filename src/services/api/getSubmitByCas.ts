import { EXTERNAL_API } from '@/config/api.ts'
import { SearchParam } from '@/types/api/SearchParam.ts'

export const getSubmitByCas = async (cas: string, signal?: AbortSignal): Promise<any> => {
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
