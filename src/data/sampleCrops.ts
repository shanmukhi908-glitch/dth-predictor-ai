import { CropInput } from '../types';

export interface CropPreset {
  id: string;
  name: string;
  description: string;
  tag: string;
  data: CropInput;
}

export const CROP_PRESETS: CropPreset[] = [
  {
    id: 'dharwar-57',
    name: 'DHARWAR_57 (Baseline Cultivar)',
    description: 'Actual sample #0 from Pheno.csv dataset with standard test weight and moderate yield.',
    tag: 'Obs #0',
    data: {
      Name: 'DHARWAR_57',
      Taxa: 'EA_51',
      Family: 'DHARWAR',
      Location: 'Spillman',
      Env: 2014,
      Yield: 2.21,
      TSTWT: 58.60,
      Protein: 13.45,
      Height: 32.83
    }
  },
  {
    id: 'dharwar-59',
    name: 'DHARWAR_59 (High Yield Line)',
    description: 'High vegetative vigour with 2.41 t/ha yield and 35.1 in plant height.',
    tag: 'High Yield',
    data: {
      Name: 'DHARWAR_59',
      Taxa: 'EA_53',
      Family: 'DHARWAR',
      Location: 'Spillman',
      Env: 2014,
      Yield: 2.41,
      TSTWT: 56.57,
      Protein: 12.64,
      Height: 35.09
    }
  },
  {
    id: 'dharwar-61',
    name: 'DHARWAR_61 (High Protein Elite)',
    description: 'Elevated crude protein content (13.84%) and compact canopy height (33.09 in).',
    tag: 'High Protein',
    data: {
      Name: 'DHARWAR_61',
      Taxa: 'EA_55',
      Family: 'DHARWAR',
      Location: 'Spillman',
      Env: 2014,
      Yield: 1.73,
      TSTWT: 56.17,
      Protein: 13.84,
      Height: 33.09
    }
  },
  {
    id: 'late-season',
    name: 'Late Heading Experimental Trial',
    description: 'Tall canopy (41.5 in) with heavy grain test weight (60.2 lb/bu) in 2016 season.',
    tag: 'Late Heading',
    data: {
      Name: 'DHARWAR_72',
      Taxa: 'EA_64',
      Family: 'DHARWAR',
      Location: 'Pullman',
      Env: 2016,
      Yield: 3.12,
      TSTWT: 60.20,
      Protein: 14.10,
      Height: 41.50
    }
  }
];

export const CATEGORICAL_OPTIONS = {
  names: [
    'DHARWAR_57',
    'DHARWAR_58',
    'DHARWAR_59',
    'DHARWAR_60',
    'DHARWAR_61',
    'DHARWAR_62',
    'DHARWAR_63',
    'DHARWAR_64',
    'DHARWAR_65',
    'DHARWAR_70',
    'DHARWAR_72',
    'PBW_Line_102',
    'HD_Cultivar_89'
  ],
  taxas: [
    'EA_51',
    'EA_52',
    'EA_53',
    'EA_54',
    'EA_55',
    'EA_56',
    'EA_57',
    'EA_58',
    'EA_60',
    'EA_64'
  ],
  families: [
    'DHARWAR',
    'PBW343',
    'RAJ3765',
    'HD2967',
    'KALYANSONA'
  ],
  locations: [
    'Spillman',
    'Pullman',
    'Central Plain',
    'Hill Station Research Field'
  ]
};
