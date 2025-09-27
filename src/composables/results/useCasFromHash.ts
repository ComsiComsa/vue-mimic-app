import { ref, computed, type Ref, type ComputedRef, onMounted, onBeforeUnmount } from 'vue'
import { HashKey } from '@/types/results/HashKey.ts'
import { getValueFromResultHash } from '@/utils/results/getValueFromResultHash.ts'

export interface UseCasFromHash {
  cas: Ref<string | null>
  isValid: ComputedRef<boolean>
}

export const useCasFromHash = (): UseCasFromHash => {
  const cas = ref<string | null>(null)

  const isValid = computed<boolean>(() => Boolean(cas.value))

  const getCasValue = (): void => {
    cas.value = getValueFromResultHash(window.location.hash, HashKey.CAS_VALUE)
  }

  const onHashChange = (): void => {
    getCasValue()
  }

  onMounted(() => {
    getCasValue()

    window.addEventListener('hashchange', onHashChange, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('hashchange', onHashChange)
  })

  return {
    cas,
    isValid,
  }
}
