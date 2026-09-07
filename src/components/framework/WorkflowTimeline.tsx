import React from 'react';
import {
  Database,
  Search,
  CheckCircle2,
  GitFork,
  Layers,
  Sliders,
  Scissors,
  BrainCircuit,
  Settings,
  BarChart3,
  Award,
  Sparkles,
  SearchCode,
  ArrowDown
} from 'lucide-react';

interface MethodologyStage {
  step: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  technicalDetails: string[];
  parameters?: Record<string, string | number>;
}

const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    step: 1,
    title: 'Dataset',
    category: 'Data Acquisition',
    icon: <Database className="w-5 h-5 text-emerald-600" />,
    description: 'Initial ingestion of the multi-environment crop phenotypic dataset.',
    technicalDetails: [
      '1,944 total agricultural observations across multiple trial years',
      '10 attributes (9 input predictor features and 1 continuous target)',
      'Covering diverse accessions (DHARWAR lines, EA taxa lines)',
    ],
  },
  {
    step: 2,
    title: 'Data Inspection',
    category: 'Data Exploration',
    icon: <Search className="w-5 h-5 text-teal-600" />,
    description: 'Statistical distribution analysis, data type verification, and exploratory data analysis (EDA).',
    technicalDetails: [
      'Evaluation of central tendencies, variance, and kurtosis',
      '4 categorical string attributes identified (Name, Taxa, Family, Location)',
      '5 quantitative continuous features identified (Env, Yield, TSTWT, Protein, Height)',
    ],
  },
  {
    step: 3,
    title: 'Missing and Duplicate Check',
    category: 'Data Cleaning',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />,
    description: 'Rigorous data hygiene checking ensuring pristine training conditions.',
    technicalDetails: [
      'Missing value check: 0 null or NaN records found across all attributes',
      'Duplicate record check: 0 duplicate entries detected',
      'Guarantees zero imputation bias in downstream machine learning estimators',
    ],
  },
  {
    step: 4,
    title: 'Feature and Target Separation',
    category: 'Feature Engineering',
    icon: <GitFork className="w-5 h-5 text-sky-600" />,
    description: 'Partitioning independent phenotypic variables (X) from the dependent agricultural target (y).',
    technicalDetails: [
      'X: 9 input phenotypic features (4 categorical + 5 numerical)',
      'y: Days to Heading (DTH) continuous regression target',
    ],
  },
  {
    step: 5,
    title: 'One-Hot Encoding',
    category: 'Encoding',
    icon: <Layers className="w-5 h-5 text-indigo-600" />,
    description: 'Converting discrete categorical identifiers into sparse binary indicator vectors.',
    technicalDetails: [
      'Applied to: Name, Taxa, Family, Location',
      'Expands input matrix from 9 raw features into 1,328 sparse encoded dimensions',
      'Eliminates false ordinal rankings among breeding lines and testing sites',
    ],
  },
  {
    step: 6,
    title: 'Min-Max Scaling',
    category: 'Normalization',
    icon: <Sliders className="w-5 h-5 text-blue-600" />,
    description: 'Normalizing continuous physiological measurements into uniform ranges [0, 1].',
    technicalDetails: [
      'Applied to numerical features: Env, Yield, TSTWT, Protein, Height',
      'Formula: X_scaled = (X - X_min) / (X_max - X_min)',
      'Prevents high-magnitude traits (e.g. Env year) from dominating gradients',
    ],
  },
  {
    step: 7,
    title: 'Train-Test Split',
    category: 'Data Partitioning',
    icon: <Scissors className="w-5 h-5 text-amber-600" />,
    description: 'Rigorous stratified splitting to evaluate generalization performance.',
    technicalDetails: [
      '80% Training Data: 1,555 observations for model fitting',
      '20% Testing Data: 389 holdout observations strictly reserved for empirical validation',
      'Ensures zero data leakage during evaluation',
    ],
  },
  {
    step: 8,
    title: 'Model Training (MLP, Random Forest, XGBoost)',
    category: 'Model Benchmarking',
    icon: <BrainCircuit className="w-5 h-5 text-purple-600" />,
    description: 'Training three diverse regression architectures across identical training splits.',
    technicalDetails: [
      '1. Multi-Layer Perceptron (MLP): Deep neural network baseline',
      '2. Random Forest Regressor: Bagging decision tree ensemble',
      '3. XGBoost Regressor: Proposed gradient boosted regression tree framework',
    ],
  },
  {
    step: 9,
    title: 'Hyperparameter Optimization',
    category: 'Model Tuning',
    icon: <Settings className="w-5 h-5 text-emerald-800" />,
    description: 'GridSearchCV 3-Fold Cross-Validation tuning to discover optimal hyperparameters.',
    technicalDetails: [
      'Tuned parameters: n_estimators, learning_rate, max_depth, subsample, colsample_bytree',
      'Selected objective: reg:squarederror for least-squares residual minimization',
    ],
    parameters: {
      n_estimators: 800,
      learning_rate: 0.03,
      max_depth: 7,
      min_child_weight: 1,
      subsample: 0.85,
      colsample_bytree: 0.85,
      objective: 'reg:squarederror',
    },
  },
  {
    step: 10,
    title: 'Performance Evaluation',
    category: 'Validation',
    icon: <BarChart3 className="w-5 h-5 text-teal-700" />,
    description: 'Comprehensive comparative metric scoring against the 389 test holdout samples.',
    technicalDetails: [
      'MLP: R² = 0.460070, RMSE = 6.100848, MAE = 4.793661',
      'Random Forest: R² = 0.905777, RMSE = 0.073853, MAE = 0.052484',
      'XGBoost: R² = 0.907600, RMSE = 0.073600, MAE = 0.048800',
    ],
  },
  {
    step: 11,
    title: 'Final XGBoost Model',
    category: 'Champion Selection',
    icon: <Award className="w-5 h-5 text-emerald-600" />,
    description: 'Deployment of the champion XGBoost Regressor achieving approximately 90.76% accuracy.',
    technicalDetails: [
      'Selected due to superior R² (0.9076) and lowest RMSE (0.0736) and MAE (0.0488)',
      'Model serialized as xgboost_agronomy_model.pkl for high-throughput inference',
    ],
  },
  {
    step: 12,
    title: 'Days to Heading Prediction',
    category: 'Inference Engine',
    icon: <Sparkles className="w-5 h-5 text-green-600" />,
    description: 'Real-time agronomic Days to Heading (DTH) inference from user-entered phenotypic profiles.',
    technicalDetails: [
      'REST API POST /api/predict processing raw phenotypic measurements',
      'Generates exact predicted heading timeframe (e.g. 72.4 or 175.8 Days)',
      'Classifies crop into Early, Optimal Mid-Season, or Late Heading stages',
    ],
  },
  {
    step: 13,
    title: 'SHAP Explainability',
    category: 'Model Interpretability',
    icon: <SearchCode className="w-5 h-5 text-amber-700" />,
    description: 'Post-hoc explainable AI analysis interpreting biological feature attribution.',
    technicalDetails: [
      'Calculates game-theoretic Shapley values across all phenotypic predictors',
      'Identifies Plant Height (0.342) and Yield (0.285) as primary physiological drivers',
      'Provides directional impacts: Feature ↑ (delays heading) vs Feature ↓ (advances heading)',
    ],
  },
];

export const WorkflowTimeline: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Central Vertical connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-600 hidden sm:block" />

        <div className="space-y-6">
          {METHODOLOGY_STAGES.map((stage, idx) => (
            <div key={stage.step} className="relative sm:pl-16">
              {/* Node on vertical line */}
              <div className="hidden sm:flex absolute left-3 top-6 w-7 h-7 -translate-x-1/2 rounded-full bg-white border-2 border-emerald-600 shadow-sm items-center justify-center text-emerald-800 text-xs font-bold font-mono z-10">
                {stage.step}
              </div>

              {/* Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all duration-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 shadow-2xs">
                      {stage.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          Step {stage.step}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                          {stage.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>

                {/* Technical Bullet Points */}
                <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                  {stage.technicalDetails.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Hyperparameter Box for Step 9 */}
                {stage.parameters && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 mt-3">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      XGBoost Model Configuration (GridSearchCV Optimal)
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs font-mono">
                      {Object.entries(stage.parameters).map(([key, val]) => (
                        <div key={key} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                          <span className="text-[10px] text-slate-400 block font-sans">{key}</span>
                          <span className="font-bold text-emerald-300">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting Down Arrow between steps */}
              {idx < METHODOLOGY_STAGES.length - 1 && (
                <div className="flex justify-center sm:justify-start sm:pl-10 my-2 text-emerald-500">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
