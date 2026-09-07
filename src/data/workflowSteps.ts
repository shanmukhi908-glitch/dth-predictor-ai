import { WorkflowStep } from '../types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Dataset Collection',
    category: 'Data Acquisition',
    shortDesc: 'Agronomic phenotypic crop dataset containing 1,944 crop observations and 10 attributes.',
    iconName: 'Database',
    details: [
      'Phenotypic crop records sourced from multi-environmental wheat breeding trials.',
      'Dataset filename: Pheno.csv containing 1,944 field observations.',
      '4 categorical attributes: Name, Taxa, Family, Location.',
      '5 numerical continuous measurements: Env, Yield, TSTWT, Protein, Height.',
      'Target trait: Days to Heading (DTH) measured as days from planting to spike emergence.'
    ],
    metricsBadge: '1,944 Samples'
  },
  {
    stepNumber: 2,
    title: 'Data Preprocessing',
    category: 'Pipeline Preparation',
    shortDesc: 'Feature-target separation, one-hot categorical encoding, zero missing values, and Min-Max normalization.',
    iconName: 'Sliders',
    details: [
      'Data inspection verified zero missing null values and zero duplicate records.',
      'Feature-target separation isolating 9 predictors from the continuous target DTH.',
      'One-hot encoding applied to categorical columns (Name, Taxa, Family, Location), transforming 9 original columns into 1,328 sparse encoded features.',
      'Min-Max scaling applied to numerical features to standardize input bounds [0, 1] for stable neural network and tree splitting gradients.'
    ],
    metricsBadge: '1,328 Encoded Features'
  },
  {
    stepNumber: 3,
    title: 'Train-Test Split',
    category: 'Validation Strategy',
    shortDesc: 'Stratified 80% training partition (1,555 samples) and 20% holdout testing partition (389 samples).',
    iconName: 'Split',
    details: [
      'Data split executed with random_state=42 for deterministic experimental reproducibility.',
      'Training set: 80% (1,555 samples) utilized for model parameter training and cross-validation.',
      'Testing set: 20% (389 samples) reserved strictly for unbiased generalization evaluation.',
      'Zero data leakage guaranteed between training and testing folds.'
    ],
    metricsBadge: '80% Train / 20% Test'
  },
  {
    stepNumber: 4,
    title: 'Model Training',
    category: 'Algorithm Exploration',
    shortDesc: 'Benchmarking Multi-Layer Perceptron (MLP), Random Forest Regressor, and XGBoost Regressor.',
    iconName: 'Cpu',
    details: [
      'Multi-Layer Perceptron (MLP): 3-layer neural network (1328 -> 128 -> 64 -> 1) with ReLU activations and Adam optimizer.',
      'Random Forest Regressor: 300 bagged decision trees with bootstrap sampling.',
      'XGBoost Regressor: Extreme gradient boosted regression trees optimizing squared error loss function with regularization.'
    ],
    metricsBadge: '3 Models Evaluated'
  },
  {
    stepNumber: 5,
    title: 'Hyperparameter Optimization',
    category: 'Model Tuning',
    shortDesc: 'GridSearchCV with 3-fold cross-validation optimizing learning rate, depth, and regularization.',
    iconName: 'Wrench',
    details: [
      'Exhaustive parameter sweep across estimator counts, tree depths, and subsample ratios.',
      '3-Fold cross validation ensures robust metric estimation without overfitting.',
      'XGBoost Optimal Hyperparameters verified in research experiments:'
    ],
    parameters: {
      'n_estimators': 800,
      'learning_rate': 0.03,
      'max_depth': 7,
      'min_child_weight': 1,
      'subsample': 0.85,
      'colsample_bytree': 0.85,
      'objective': 'reg:squarederror'
    },
    metricsBadge: '3-Fold CV'
  },
  {
    stepNumber: 6,
    title: 'Model Evaluation',
    category: 'Performance Benchmarking',
    shortDesc: 'Multi-metric assessment calculating R² Score, Root Mean Squared Error (RMSE), and Mean Absolute Error (MAE).',
    iconName: 'BarChart3',
    details: [
      'R² Score: Measures the proportion of variance in Days to Heading explained by phenotypic inputs.',
      'RMSE: Penalizes larger variance deviations to check model prediction stability.',
      'MAE: Measures the mean absolute deviation in days between predicted and actual heading dates.',
      'XGBoost achieved R² = 0.907600, RMSE = 0.073600, MAE = 0.048800.'
    ],
    metricsBadge: 'R² = 0.9076'
  },
  {
    stepNumber: 7,
    title: 'Final Prediction Framework',
    category: 'System Deployment',
    shortDesc: 'Selection and packaging of the high-accuracy XGBoost Regressor for real-time agronomic deployment.',
    iconName: 'CheckCircle2',
    details: [
      'XGBoost Regressor selected as the proposed champion model due to superior accuracy (~90.76%).',
      'Outperforms Multi-Layer Perceptron (R² 0.4600) by +44.75% and edges out Random Forest (R² 0.9058).',
      'Serialised model structure saved as joblib archive (xgboost_agronomy_model.pkl) for instantaneous low-latency inference.'
    ],
    metricsBadge: 'Champion: XGBoost'
  },
  {
    stepNumber: 8,
    title: 'Model Explainability (SHAP)',
    category: 'Biological Interpretability',
    shortDesc: 'SHAP (SHapley Additive exPlanations) game-theoretic feature attribution for agricultural transparency.',
    iconName: 'Search',
    details: [
      'SHAP analysis computes marginal contributions of each phenotypic measurement towards final heading prediction.',
      'Reveals Plant Height and Harvest Yield as the primary phenotypic drivers of Days to Heading timing.',
      'Empowers agronomists and crop breeders to understand feature causality rather than relying on black-box predictions.'
    ],
    metricsBadge: 'SHAP Explanations'
  }
];
