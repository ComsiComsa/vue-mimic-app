export interface ChemicalProperties {
  name: string;
  systematicName: string | null;
  cas: string;
  smiles: string | null;

  molecularWeight: number | null;
  molecularFormula: string | null;
  molecularFormulaHtml: string | null;

  organic: boolean | null;
  organicAcid: boolean | null;
  aminoAcid: boolean | null;
  nonStandardMetal: boolean | null;

  flags: string[] | null;
}
