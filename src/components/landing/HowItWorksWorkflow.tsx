import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Filter,
  Layers,
  BrainCircuit,
  Cpu,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface WorkflowStepItem {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
}

const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    number: 1,
    title: 'Phenotypic Data Input',
    subtitle: '9 Agronomic Attributes',
    description: 'Collection of 1,944 field crop observations with 4 categorical identifiers and 5 numerical physiological traits.',
    badge: 'Raw Observations',
    icon: <FileSpreadsheet className="w-5 h-5 text-emerald-600" />,
  },
  {
    number: 2,
    title: 'Data Preprocessing',
    subtitle: 'Quality & Integrity Checks',
    description: 'Systematic missing value audit (0 missing found), duplicate removal (0 duplicate records), and feature-target separation.',
    badge: 'Clean Pipeline',
    icon: <Filter className="w-5 h-5 text-teal-600" />,
  },
  {
    number: 3,
    title: 'Feature Encoding & Scaling',
    subtitle: 'One-Hot & Min-Max',
    description: 'One-hot encoding of categorical features (Name, Taxa, Family, Location) into 1,328 sparse dimensions and Min-Max numerical scaling.',
    badge: '1,328 Features',
    icon: <Layers className="w-5 h-5 text-sky-600" />,
  },
  {
    number: 4,
    title: 'Machine Learning Analysis',
    subtitle: 'Comparative Evaluation',
    description: 'Benchmarking Multi-Layer Perceptron (R² 0.4601), Random Forest (R² 0.9058), and XGBoost under 3-Fold Cross-Validation.',
    badge: '3 Algorithms',
    icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
  },
  {
    number: 5,
    title: 'XGBoost Prediction',
    subtitle: 'Proposed Champion Model',
    description: 'Gradient boosted ensemble (800 estimators, lr=0.03, depth=7) predicting Days to Heading with 90.76% R² accuracy and 0.0736 RMSE.',
    badge: 'R² = 0.9076',
    icon: <Cpu className="w-5 h-5 text-emerald-700" />,
  },
  {
    number: 6,
    title: 'SHAP Explainability',
    subtitle: 'Model Interpretability',
    description: 'Game-theoretic Shapley values uncover physiological feature attribution (Plant Height, Grain Yield, Protein) for actionable breeding decisions.',
    badge: 'XAI Attribution',
    icon: <Sparkles className="w-5 h-5 text-amber-600" />,
  },
];

export const HowItWorksWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(5);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Methodological Flow</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How the DTH Prediction Pipeline Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            A rigorous 6-step machine learning framework transforming raw phenotypic field data into interpretable Days to Heading predictions.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-medium hidden md:block">
          Hover or click steps to view stage details
        </div>
      </div>

      {/* Horizontal Workflow Cards with Connecting Line */}
      <div className="relative">
        {/* Connecting Line behind steps (hidden on mobile, visible on lg) */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-300 -translate-y-6 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
          {WORKFLOW_STEPS.map((step) => {
            const isCurrent = activeStep === step.number;
            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(step.number)}
                onClick={() => setActiveStep(step.number)}
                className={`group relative rounded-2xl p-4 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105 ring-2 ring-emerald-500/20'
                    : 'bg-white/90 hover:bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300'
                }`}
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                        isCurrent
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50/60 transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                    {step.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    {step.subtitle}
                  </div>
                </div>

                {/* Badge at Bottom */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 transition-colors">
                    {step.badge}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all ${
                      isCurrent ? 'text-emerald-600' : ''
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Highlight Box */}
      {activeStep && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-slate-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm flex-shrink-0 mt-0.5 sm:mt-0">
              {WORKFLOW_STEPS[activeStep - 1].icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Step {WORKFLOW_STEPS[activeStep - 1].number}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-sm font-bold text-slate-900">
                  {WORKFLOW_STEPS[activeStep - 1].title}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {WORKFLOW_STEPS[activeStep - 1].description}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-white border border-emerald-200 text-emerald-800 shadow-xs flex-shrink-0">
            {WORKFLOW_STEPS[activeStep - 1].badge}
          </span>
        </div>
      )}
    </section>
  );
};
