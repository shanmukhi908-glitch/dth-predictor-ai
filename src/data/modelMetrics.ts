import { ModelMetric } from '../types';

export const MODEL_METRICS: ModelMetric[] = [
  {
    id: 'mlp',
    name: 'Multi-Layer Perceptron (MLP)',
    type: 'Neural Network Regressor',
    r2: 0.460070,
    rmse: 6.100848,
    mae: 4.793661,
    accuracy: 46.01,
    isBest: false,
    description: 'Deep neural architecture with 3 dense linear layers (1328 -> 128 -> 64 -> 1) and ReLU activations.',
    pros: ['Captures non-linear relationships', 'Differentiable end-to-end framework'],
    cons: ['Substantially higher prediction errors (RMSE 6.10)', 'Requires extensive hyperparameter fine-tuning']
  },
  {
    id: 'rf',
    name: 'Random Forest Regressor',
    type: 'Ensemble Bagging Algorithm',
    r2: 0.905777,
    rmse: 0.073853,
    mae: 0.052484,
    accuracy: 90.58,
    isBest: false,
    badge: 'Competitive Baseline',
    description: 'Ensemble of 300 decision trees utilizing random feature subsets and bagging aggregation.',
    pros: ['Strong baseline accuracy (>90.5%)', 'Low susceptibility to overfitting'],
    cons: ['Slightly higher MAE than XGBoost', 'Higher memory footprint for large forest structures']
  },
  {
    id: 'xgboost',
    name: 'XGBoost Regressor',
    type: 'Gradient Boosted Decision Trees',
    r2: 0.907600,
    rmse: 0.073600,
    mae: 0.048800,
    accuracy: 90.76,
    isBest: true,
    badge: 'Best Proposed Model',
    description: 'Second-order gradient boosted trees with L1/L2 regularization, tuned via GridSearchCV with 3-fold cross validation.',
    pros: [
      'Highest R² score (0.907600) and lowest MAE (0.048800)',
      'Subsample (0.85) and colsample (0.85) prevent overfitting',
      'Native handling of sparse one-hot encoded phenotypic matrices'
    ],
    cons: ['Requires careful tuning of tree depth and learning rate']
  }
];

export const R2_COMPARISON_DATA = [
  { model: 'MLP', fullName: 'Multi-Layer Perceptron', r2: 0.460070, percentage: 46.01, fill: '#94a3b8' },
  { model: 'Random Forest', fullName: 'Random Forest Regressor', r2: 0.905777, percentage: 90.58, fill: '#3b82f6' },
  { model: 'XGBoost', fullName: 'XGBoost Regressor (Proposed)', r2: 0.907600, percentage: 90.76, fill: '#16a34a' }
];

export const ERROR_COMPARISON_DATA = [
  { model: 'MLP', RMSE: 6.100848, MAE: 4.793661 },
  { model: 'Random Forest', RMSE: 0.073853, MAE: 0.052484 },
  { model: 'XGBoost', RMSE: 0.073600, MAE: 0.048800 }
];

export const RESIDUAL_ANALYSIS_DATA = [
  { actual: 168.2, predicted: 168.4, residual: 0.2, model: 'XGBoost' },
  { actual: 172.5, predicted: 172.3, residual: -0.2, model: 'XGBoost' },
  { actual: 175.8, predicted: 175.7, residual: -0.1, model: 'XGBoost' },
  { actual: 177.8, predicted: 177.9, residual: 0.1, model: 'XGBoost' },
  { actual: 180.1, predicted: 180.3, residual: 0.2, model: 'XGBoost' },
  { actual: 182.4, predicted: 182.2, residual: -0.2, model: 'XGBoost' },
  { actual: 185.0, predicted: 184.8, residual: -0.2, model: 'XGBoost' },
  { actual: 188.3, predicted: 188.5, residual: 0.2, model: 'XGBoost' }
];
