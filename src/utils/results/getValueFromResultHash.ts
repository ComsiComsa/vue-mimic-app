import type { HashKey } from '@/types/results/HashKey.ts'

const RESULT_HASH_PATTERN = '#results;'
const HASH_PARAM_SEPARATOR = ';'

export const getValueFromResultHash = (hash: string, searchKey: HashKey): string | null => {
  const isValidHashPattern = hash.startsWith(RESULT_HASH_PATTERN)

  if (isValidHashPattern) {
    const parameters = hash.split(HASH_PARAM_SEPARATOR)

    for (let i = 1; i < parameters.length; i++) {
      const [key, value = ''] = parameters[i].split('=')

      if (key === searchKey) {
        return value ?? null
      }
    }
  }

  return null
}
