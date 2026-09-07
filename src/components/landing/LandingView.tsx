import React from 'react';
import { LandingHero } from './LandingHero';
import { HowItWorksWorkflow } from './HowItWorksWorkflow';
import { PageId } from '../../types';
import {
  Sparkles,
  BarChart3,
  Search,
  ArrowRight,
  BookOpen,
  Database,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (page: PageId) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section */}
      <LandingHero onNavigate={onNavigate} />

      {/* 2. Below Hero: Three Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: 1,944 Dataset Records */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Agronomic Dataset
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
            1,944
          </div>
          <div className="text-sm font-bold text-emerald-800 mt-1">
            Dataset Records
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Authentic multi-environment field observations with 0 missing values and 0 duplicate entries.
          </p>
        </div>

        {/* Card 2: 9 Input Features */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-teal-300 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Feature Dimensionality
            </span>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
            9
          </div>
          <div className="text-sm font-bold text-teal-800 mt-1">
            Input Features
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            4 categorical features (Name, Taxa, Family, Location) and 5 quantitative traits (Env, Yield, TSTWT, Protein, Height).
          </p>
        </div>

        {/* Card 3: 90.76% XGBoost Performance */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-emerald-400 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Proposed Accuracy
            </span>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-100 to-green-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono tracking-tight">
            90.76%
          </div>
          <div className="text-sm font-bold text-emerald-800 mt-1">
            XGBoost Performance
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Champion model performance based on R² × 100 with ultra-low RMSE of 0.0736 and MAE of 0.0488.
          </p>
        </div>
      </section>

      {/* 3. Horizontal Workflow Section: How It Works */}
      <HowItWorksWorkflow />

      {/* 4. Core Modules Grid */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore the Machine Learning Framework
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Access specialized modules designed for precision agricultural evaluation and crop breeding analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1: Prediction Studio */}
          <div
            onClick={() => onNavigate('predict')}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Interactive Prediction Studio
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Enter categorical taxonomy (Name, Taxa, Family, Location) and phenotypic measurements (Yield, Height, Protein, TSTWT, Env) to predict Days to Heading.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>Launch Predictor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Model Benchmark */}
          <div
            onClick={() => onNavigate('analytics')}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-sky-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100/70 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                Model Performance & Analytics
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Detailed comparison across Multi-Layer Perceptron (R² 0.4601), Random Forest (R² 0.9058), and XGBoost (R² 0.9076) plus Actual vs Predicted scatter analysis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700 group-hover:text-sky-800">
              <span>View Analytics & Charts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: SHAP Explainability */}
          <div
            onClick={() => onNavigate('explainability')}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-teal-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                SHAP Interpretability & XAI
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Discover physiological feature attributions. Uncover how canopy height, harvest yield, and grain protein drive heading date shifts using Shapley additive explanations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800">
              <span>Explore SHAP Insights</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Research Context Card */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research Project Summary</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              “An Enhanced Machine Learning Framework for Predicting Days to Heading Using Phenotypic Data”
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Predicting the Days to Heading (DTH) phenological trait enables agronomists to optimize harvest windows, avoid terminal heat stress, and accelerate crop breeding cycles. This study establishes that an optimized XGBoost Regressor achieves an exceptional R² of 0.907600 and low RMSE of 0.073600.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => onNavigate('predict')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs sm:text-sm font-bold text-center shadow-md transition cursor-pointer"
            >
              Start Crop Prediction
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold text-center border border-white/20 transition cursor-pointer"
            >
              Read About Research
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
