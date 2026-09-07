import React from 'react';
import {
  BookOpen,
  Award,
  Cpu,
  Code2,
  Server,
  Layers,
  CheckCircle2,
  Target,
  FileText,
  Clock,
  Sparkles,
  Compass,
  GitBranch,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Database
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic Research Documentation</span>
        </div>
        {/* Exact Heading as requested */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About the Research
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
          Comprehensive project background, biological motivation, empirical findings, and future development horizons.
        </p>
      </div>

      {/* Main Abstract & Summary Quote */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
          Research Framework Title
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          “An Enhanced Machine Learning Framework for Predicting Days to Heading Using Phenotypic Data”
        </h2>

        {/* Exact explanation as requested */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-slate-50 border border-emerald-100/90 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
          “This project introduces an enhanced machine learning framework for predicting Days to Heading (DTH) using phenotypic data. The system compares MLP, Random Forest, and XGBoost regression models, with XGBoost achieving the strongest predictive performance.”
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-400 block font-sans">Domain</span>
            <span className="font-bold text-slate-800">Precision Agri / AI</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-400 block font-sans">Target Metric</span>
            <span className="font-bold text-slate-800">Days to Heading (DTH)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-400 block font-sans">Champion Model</span>
            <span className="font-bold text-emerald-700">XGBoost Regressor</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-400 block font-sans">Accuracy (R² × 100)</span>
            <span className="font-bold text-emerald-700">90.76%</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Problem Statement */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              1. Problem Statement
            </h3>
            <p className="text-xs text-slate-500">The agricultural challenge of phenological forecasting</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Accurate phenological crop staging—specifically predicting the timing of inflorescence emergence or Days to Heading (DTH)—is difficult due to non-linear interactions between crop genetics, environmental weather volatility, and agronomic management. Traditional manual field scoring is labor-intensive, subjective, and retrospective. Furthermore, standard linear models struggle to account for multi-environment phenotypic interactions, resulting in poor predictive reliability.
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed">
          <strong>Key Research Question:</strong> Can an optimized gradient boosted tree architecture (XGBoost) combined with extensive categorical one-hot encoding and min-max scaling deliver near-human-expert precision ($R^2 &gt; 0.90$) for predicting DTH across diverse multi-environment trials?
        </div>
      </section>

      {/* SECTION 2: Why Days to Heading Matters */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              2. Why Days to Heading Matters
            </h3>
            <p className="text-xs text-slate-500">Biological and agronomic importance of the heading stage</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Days to Heading (DTH) marks the pivotal transition from the vegetative phase to the reproductive phase in cereal crops (such as wheat). Heading timing directly impacts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
            <span className="text-xs font-bold text-emerald-900 block">Terminal Heat Avoidance</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Early heading enables crops to complete flowering and grain fill before intense summer temperatures cause spikelet sterility.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
            <span className="text-xs font-bold text-emerald-900 block">Moisture & Yield Optimization</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synchronizing peak floral water demand with seasonal spring rainfall maximizes kernel filling, test weight, and total harvest yield.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
            <span className="text-xs font-bold text-emerald-900 block">Breeding Selection Efficiency</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accelerates breeding line selection, allowing agronomists to simulate heading cycles across virtual target environments without multi-year delay.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dataset Overview */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              3. Dataset Overview
            </h3>
            <p className="text-xs text-slate-500">1,944 multi-environment observations with 10 attributes</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The benchmark dataset contains <strong>1,944 observations</strong> with <strong>10 total attributes</strong> (9 input features and 1 target variable):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              4 Categorical Input Features
            </span>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>• <strong>Name:</strong> Cultivar accession identifier (e.g. DHARWAR_57, DHARWAR_58)</li>
              <li>• <strong>Taxa:</strong> Taxonomical sub-population lineage code (e.g. EA_51, EA_52)</li>
              <li>• <strong>Family:</strong> Familial pedigree breeding group (e.g. DHARWAR, PBW343)</li>
              <li>• <strong>Location:</strong> Field trial testing station (e.g. Spillman, Pullman)</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              5 Numerical Input Features + 1 Target
            </span>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>• <strong>Env:</strong> Trial environment year (e.g. 2014, 2015, 2016)</li>
              <li>• <strong>Yield:</strong> Harvested grain yield in metric tons per hectare (t/ha)</li>
              <li>• <strong>TSTWT:</strong> Test weight in pounds per bushel (lb/bu)</li>
              <li>• <strong>Protein:</strong> Crude seed protein concentration percentage (%)</li>
              <li>• <strong>Height:</strong> Mature canopy plant height in inches (in)</li>
              <li>• <strong className="text-emerald-700">Target (DTH):</strong> Days to Heading continuous value</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: Machine Learning Models */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-700">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              4. Machine Learning Models
            </h3>
            <p className="text-xs text-slate-500">Comparative exploration across three distinct algorithmic paradigms</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">1. Multi-Layer Perceptron (MLP)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Feedforward artificial neural network using backpropagation with dense interconnected hidden layers and non-linear activations. Struggles with sparse one-hot encoded agronomic features.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">2. Random Forest Regressor</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensemble of randomized decision trees utilizing bootstrap aggregating (bagging) to reduce variance. Demonstrated strong baseline performance ($R^2 = 0.9058$).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-950 block">3. XGBoost Regressor (Proposed)</span>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Optimized gradient boosting framework that iteratively fits new trees to pseudo-residuals using second-order Taylor expansion gradients. Achieves top predictive accuracy ($R^2 = 0.9076$).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Model Evaluation */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              5. Model Evaluation
            </h3>
            <p className="text-xs text-slate-500">Rigorous empirical comparison across 389 test observations</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="py-2.5 pr-4">Model Architecture</th>
                <th className="py-2.5 px-4 font-mono">R² Score (Accuracy)</th>
                <th className="py-2.5 px-4 font-mono">RMSE (Days)</th>
                <th className="py-2.5 px-4 font-mono">MAE (Days)</th>
                <th className="py-2.5 pl-4">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 pr-4 font-semibold">Multi-Layer Perceptron (MLP)</td>
                <td className="py-3 px-4 font-mono font-bold text-red-600">0.460070</td>
                <td className="py-3 px-4 font-mono">6.100848</td>
                <td className="py-3 px-4 font-mono">4.793661</td>
                <td className="py-3 pl-4 text-slate-500">High variance baseline</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Random Forest Regressor</td>
                <td className="py-3 px-4 font-mono font-bold text-sky-700">0.905777</td>
                <td className="py-3 px-4 font-mono">0.073853</td>
                <td className="py-3 px-4 font-mono">0.052484</td>
                <td className="py-3 pl-4 text-sky-700 font-medium">Strong ensemble</td>
              </tr>
              <tr className="bg-emerald-50/50 font-semibold">
                <td className="py-3 pr-4 text-emerald-950 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>XGBoost Regressor (Proposed)</span>
                </td>
                <td className="py-3 px-4 font-mono font-black text-emerald-700">0.907600 (90.76%)</td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-700">0.073600</td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-700">0.048800</td>
                <td className="py-3 pl-4 text-emerald-800 font-bold">Champion Model</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: Explainable AI (SHAP) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              6. Explainable AI (SHAP)
            </h3>
            <p className="text-xs text-slate-500">Biological transparency and feature attribution</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          To ensure the model is not a black box, SHAP (SHapley Additive exPlanations) analysis is implemented. SHAP quantifies the contribution of each phenotypic feature toward advancing or delaying heading. Global analysis reveals that <strong>Plant Height</strong> (0.342) and <strong>Yield</strong> (0.285) are the dominant drivers of heading date divergence, confirming known agronomic correlations where taller, higher-biomass canopies require prolonged vegetative phases before heading emergence.
        </p>
      </section>

      {/* SECTION 7: Future Scope (Explicitly covering all 8 points) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              7. Future Scope
            </h3>
            <p className="text-xs text-slate-500">Next-generation enhancements and prospective research frontiers</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          While the current framework establishes high predictive precision ($R^2 = 0.9076$), ongoing and future research will advance the architecture across eight strategic directions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* 1. Independent datasets */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">1</span>
              <span>Independent Datasets</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              External out-of-distribution validation across multi-continental cereal breeding repositories to test generalizability across diverse germplasms.
            </p>
          </div>

          {/* 2. Different environments */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">2</span>
              <span>Different Environments</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Evaluation under extreme agro-ecological zones including arid desert trials, high-altitude hill stations, and saline soil regimens.
            </p>
          </div>

          {/* 3. Climatic variables */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">3</span>
              <span>Climatic Variables</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Integration of fine-grained weather metrics: diurnal temperature swings, solar radiation, photoperiod daylight hours, and vapor pressure deficit (VPD).
            </p>
          </div>

          {/* 4. Genomic data */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">4</span>
              <span>Genomic Data</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Combining high-density single nucleotide polymorphism (SNP) markers with phenotypic inputs for hybrid genomic-phenomic selection models.
            </p>
          </div>

          {/* 5. Multi-source agricultural data */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">5</span>
              <span>Multi-Source Agricultural Data</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Fusing drone hyperspectral imaging, remote sensing satellite NDVI time-series, and IoT soil moisture sensor telemetries.
            </p>
          </div>

          {/* 6. Advanced deep learning models */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">6</span>
              <span>Advanced Deep Learning Models</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Exploring spatial-temporal graph neural networks (GNNs) and transformer-based phenological architectures for sequence forecasting.
            </p>
          </div>

          {/* 7. MLOps deployment */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">7</span>
              <span>MLOps Deployment</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Continuous integration and continuous deployment (CI/CD) pipelines with automated containerized model packaging using Docker and Kubernetes.
            </p>
          </div>

          {/* 8. Continuous model monitoring */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">8</span>
              <span>Continuous Model Monitoring</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-7 leading-relaxed">
              Automated data drift detection, concept drift tracking, and model recalibration pipelines as new harvest seasons produce fresh field data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
