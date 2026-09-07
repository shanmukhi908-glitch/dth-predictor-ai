export interface CropInput {
  Name: string;
  Taxa: string;
  Family: string;
  Location: string;
  Env: number;
  Yield: number;
  TSTWT: number;
  Protein: number;
  Height: number;
}

export interface FeatureImpact {
  feature: string;
  value: string | number;
  impact: number; // positive increases DTH, negative decreases
  description: string;
  type: 'increases_dth' | 'decreases_dth' | 'neutral';
}

export interface PredictionApiResponse {
  prediction: number;
  model: string;
  r2: number;
  rmse: number;
  mae: number;
  confidence?: 'High' | 'Very High' | 'Moderate';
  confidencePercentage?: number;
  maturityCategory?: 'Early Season (< 170 Days)' | 'Optimal Mid-Season (170 - 178 Days)' | 'Late Season (> 178 Days)';
  phenologicalStage?: 'Heading / Inflorescence Emergence';
  explanation?: string;
  featureImpacts?: FeatureImpact[];
}

export interface PredictionResult extends PredictionApiResponse {
  timestamp: string;
}

export interface PredictionHistoryItem {
  id: string;
  cropName: string;
  taxa: string;
  family: string;
  location: string;
  yieldVal: number;
  height: number;
  tstwt: number;
  protein: number;
  predictedDTH: number;
  model: string;
  confidence: string;
  createdAt: string;
}

export interface ModelMetric {
  id: string;
  name: string;
  type: string;
  r2: number;
  rmse: number;
  mae: number;
  accuracy: number;
  isBest?: boolean;
  badge?: string;
  description: string;
  pros: string[];
  cons: string[];
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  category: string;
  shortDesc: string;
  details: string[];
  parameters?: Record<string, string | number>;
  metricsBadge?: string;
  iconName: string;
}

export interface ActualVsPredictedPoint {
  sampleId: number;
  actual: number;
  predicted: number;
  residual: number;
  cultivar: string;
  location: string;
}

export interface ShapGlobalItem {
  feature: string;
  importance: number;
  rank: number;
  direction: 'increases_dth' | 'decreases_dth' | 'mixed';
  description: string;
}

export type PageId =
  | 'home'
  | 'landing'
  | 'dashboard'
  | 'predict'
  | 'analytics'
  | 'performance'
  | 'explainability'
  | 'shap'
  | 'methodology'
  | 'framework'
  | 'about'
  | 'dataset';
