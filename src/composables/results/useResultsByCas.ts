import { type ShallowRef, shallowRef, type Ref, ref, watch } from 'vue'
import { getSubmitByCas } from '@/services/api/getSubmitByCas.ts'

interface UseResultsByCas<T = unknown> {
  results: ShallowRef<T | null>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
}

export const useResultsByCas = <T = unknown>(cas: Ref<string | null>): UseResultsByCas<T> => {
  const results = shallowRef<T | null>(null)
  const isLoading = ref(false)
  const isError = ref(false)

  let controller: AbortController | null = null

  const cancelRequest = (): void => {
    controller?.abort()

    controller = null
  }

  const fetchResults = async (): Promise<void> => {
    cancelRequest()

    if (!cas.value) {
      results.value = null
      isLoading.value = false
      isError.value = false

      return
    }

    controller = new AbortController()

    isLoading.value = true
    isError.value = false

    try {
      results.value = await getSubmitByCas(cas.value, controller.signal)
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return
      }

      results.value = null
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  watch(cas, () => fetchResults(), {
    immediate: true,
  })

  return {
    results,
    isLoading,
    isError,
  }
}
