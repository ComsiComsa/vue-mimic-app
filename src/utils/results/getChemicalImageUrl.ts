const DRAW_BASE = 'https://episuite.dev/EpiWebSuite/api/draw-chemical'

export const getChemicalImageUrl = (smiles?: string | null): string | null => {
  if (!smiles) {
    return null
  }

  const url = new URL(DRAW_BASE)

  url.searchParams.set('smiles', smiles)

  return url.toString()
}
