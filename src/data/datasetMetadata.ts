export interface AttributeMeta {
  name: string;
  type: 'Categorical' | 'Numerical' | 'Target (Numerical)';
  dataType: string;
  description: string;
  unit?: string;
  sampleValues: string;
  validRange?: string;
}

export const DATASET_METADATA = {
  name: 'Pheno.csv',
  totalObservations: 1944,
  totalAttributes: 10,
  inputFeatures: 9,
  categoricalCount: 4,
  numericalCount: 5,
  targetVariable: 'Days to Heading (DTH)',
  predictionType: 'Continuous Supervised Regression',
  missingValues: 'None (0 missing entries)',
  duplicateRecords: 'None (0 duplicates detected)',
  encodedFeatureCount: 1328, // after one-hot encoding categorical variables
  trainSplit: '80% (1,555 samples)',
  testSplit: '20% (389 samples)',
  cvMethod: '3-Fold Cross-Validation (GridSearchCV)'
};

export const DATASET_ATTRIBUTES: AttributeMeta[] = [
  {
    name: 'Name',
    type: 'Categorical',
    dataType: 'string',
    description: 'Identifier and cultivar accession designation for the crop genotype.',
    sampleValues: 'DHARWAR_57, DHARWAR_58, DHARWAR_59, ...'
  },
  {
    name: 'Taxa',
    type: 'Categorical',
    dataType: 'string',
    description: 'Taxonomical sub-population/line code representing phenotypic genetic lineages.',
    sampleValues: 'EA_51, EA_52, EA_53, EA_54, ...'
  },
  {
    name: 'Family',
    type: 'Categorical',
    dataType: 'string',
    description: 'Crop pedigree or familial breeding group sharing genetic heritage.',
    sampleValues: 'DHARWAR, PBW343, RAJ3765, HD2967'
  },
  {
    name: 'Location',
    type: 'Categorical',
    dataType: 'string',
    description: 'Experimental agricultural testing research station field site.',
    sampleValues: 'Spillman, Pullman, Central Plain, Hill Station'
  },
  {
    name: 'Env',
    type: 'Numerical',
    dataType: 'integer',
    description: 'Trial environment seasonal calendar year recording seasonal weather patterns.',
    unit: 'Year',
    sampleValues: '2014, 2015, 2016',
    validRange: '2010 - 2026'
  },
  {
    name: 'Yield',
    type: 'Numerical',
    dataType: 'float',
    description: 'Total harvested grain yield quantity per unit land area.',
    unit: 'Tonnes/Hectare (t/ha)',
    sampleValues: '1.73 - 3.45',
    validRange: '0.50 - 6.00'
  },
  {
    name: 'TSTWT',
    type: 'Numerical',
    dataType: 'float',
    description: 'Grain test weight reflecting grain density, kernel plumpness, and test quality.',
    unit: 'Pounds/Bushel (lb/bu)',
    sampleValues: '55.2 - 61.8',
    validRange: '45.0 - 68.0'
  },
  {
    name: 'Protein',
    type: 'Numerical',
    dataType: 'float',
    description: 'Total grain crude protein content percentage measured at harvest.',
    unit: '%',
    sampleValues: '11.8 - 15.2',
    validRange: '8.0 - 20.0'
  },
  {
    name: 'Height',
    type: 'Numerical',
    dataType: 'float',
    description: 'Plant canopy height measured from ground level to the tip of the spike.',
    unit: 'Inches / cm',
    sampleValues: '31.5 - 44.0',
    validRange: '20.0 - 60.0'
  },
  {
    name: 'DTH',
    type: 'Target (Numerical)',
    dataType: 'float',
    description: 'Days to Heading: duration from germination/planting until spike emergence from the flag leaf sheath.',
    unit: 'Calendar Days',
    sampleValues: '165.0 - 186.5',
    validRange: '140.0 - 210.0'
  }
];

export const FEATURE_DISTRIBUTION_DATA = [
  { category: 'Categorical (Name, Taxa, Family, Location)', count: 4, encodedFeatures: 1323, fill: '#10b981' },
  { category: 'Numerical (Env, Yield, TSTWT, Protein, Height)', count: 5, encodedFeatures: 5, fill: '#3b82f6' }
];

export const SHAP_FEATURE_IMPORTANCE = [
  { feature: 'Height', importance: 0.342, rank: 1, unit: 'in', description: 'Taller plants exhibit prolonged vegetative growth, delaying heading date.' },
  { feature: 'Yield', importance: 0.285, rank: 2, unit: 't/ha', description: 'Strong bio-energetic trade-off with photoperiod sensitivity and vegetative duration.' },
  { feature: 'Protein', importance: 0.168, rank: 3, unit: '%', description: 'Nitrogen partitioning dynamics correlate with reproductive transition timing.' },
  { feature: 'TSTWT', importance: 0.114, rank: 4, unit: 'lb/bu', description: 'Kernel density indicator reflecting physiological sink capacity.' },
  { feature: 'Env (Year)', importance: 0.048, rank: 5, unit: 'yr', description: 'Seasonal temperature accumulation and degree days across trial years.' },
  { feature: 'Location', importance: 0.024, rank: 6, unit: 'site', description: 'Micro-climate variations, soil moisture, and altitude across trial plots.' },
  { feature: 'Family', importance: 0.012, rank: 7, unit: 'pedigree', description: 'Heritable ancestral flowering sensitivity genes (Vrn & Ppd alleles).' },
  { feature: 'Taxa', importance: 0.005, rank: 8, unit: 'line', description: 'Sub-line specific flowering alleles and heading adaptability.' },
  { feature: 'Name', importance: 0.002, rank: 9, unit: 'accession', description: 'Genotype-specific baseline phenological emergence offset.' }
];
