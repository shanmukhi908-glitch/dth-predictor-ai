import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  Server
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ShapGlobalItem, FeatureImpact, CropInput } from '../../types';
import { fetchShapGlobal, fetchShapPredictionExplanation } from '../../services/api';
import { CROP_PRESETS } from '../../data/sampleCrops';

export const ShapView: React.FC = () => {
  const [globalFeatures, setGlobalFeatures] = useState<ShapGlobalItem[]>([]);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(true);

  // Local instance explanation state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('dharwar-57');
  const [instanceImpacts, setInstanceImpacts] = useState<FeatureImpact[]>([]);
  const [isLoadingInstance, setIsLoadingInstance] = useState<boolean>(true);

  useEffect(() => {
    loadGlobalData();
    loadInstanceData(CROP_PRESETS[0].data);
  }, []);

  const loadGlobalData = async () => {
    setIsLoadingGlobal(true);
    try {
      const data = await fetchShapGlobal();
      setGlobalFeatures(data);
    } catch (e) {
      console.error('Error fetching global SHAP data:', e);
    } finally {
      setIsLoadingGlobal(false);
    }
  };

  const loadInstanceData = async (crop: CropInput) => {
    setIsLoadingInstance(true);
    try {
      const data = await fetchShapPredictionExplanation(crop);
      setInstanceImpacts(data);
    } catch (e) {
      console.error('Error fetching prediction explanation:', e);
    } finally {
      setIsLoadingInstance(false);
    }
  };

  const handleSelectSample = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = CROP_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      loadInstanceData(preset.data);
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <Search className="w-3.5 h-3.5" />
          <span>Explainable Artificial Intelligence (XAI)</span>
        </div>
        {/* Exact Heading as requested */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Understand the Prediction
        </h1>
        {/* Exact Subheading as requested */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
          Explore how phenotypic features influence the XGBoost prediction using SHAP analysis.
        </p>
      </div>

      {/* SHAP Concept Overview Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Game-Theoretic Feature Attribution (Shapley Values)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
          SHAP (SHapley Additive exPlanations) computes the fair marginal contribution of each phenotypic feature across all possible feature permutations. This demystifies the XGBoost regression model, transforming it into an interpretable agronomic decision support system.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-emerald-300">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            GET /api/shap/global
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            POST /api/shap/prediction
          </span>
        </div>
      </div>

      {/* SECTION A: Global Feature Importance */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                A. Global Feature Importance
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked average contribution magnitude (Mean |SHAP Value|) across the 1,944 observations
            </p>
          </div>

          <button
            onClick={loadGlobalData}
            disabled={isLoadingGlobal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition self-start cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGlobal ? 'animate-spin' : ''}`} />
            <span>Reload SHAP Data</span>
          </button>
        </div>

        {/* SHAP Importance Bars */}
        <div className="h-80 w-full pt-2">
          {isLoadingGlobal ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-medium">Fetching global SHAP importance bars...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={globalFeatures}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 90, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  label={{
                    value: 'Mean |SHAP Value| (Impact on DTH in Days)',
                    position: 'insideBottom',
                    offset: -5,
                    fill: '#64748b',
                    fontSize: 11,
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ShapGlobalItem;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl text-xs space-y-1 max-w-xs">
                          <div className="font-bold text-emerald-400 text-sm">
                            Rank #{data.rank}: {data.feature}
                          </div>
                          <div>
                            Mean |SHAP| Value:{' '}
                            <span className="font-mono font-bold">{data.importance.toFixed(3)}</span>
                          </div>
                          <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800">
                            {data.description}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
                  {globalFeatures.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#064e3b'
                          : index === 1
                          ? '#047857'
                          : index === 2
                          ? '#059669'
                          : index === 3
                          ? '#10b981'
                          : '#34d399'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Feature Ranking Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {globalFeatures.slice(0, 4).map((f) => (
            <div key={f.feature} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{f.feature}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Rank #{f.rank}
                </span>
              </div>
              <div className="text-lg font-black font-mono text-emerald-700 mt-1">
                {f.importance.toFixed(3)}
              </div>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug truncate" title={f.description}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION B: Prediction Explanation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                B. Prediction Explanation
              </h2>
            </div>
            {/* Exact prompt text */}
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5">
              “Why did the model predict this value?”
            </p>
          </div>

          {/* Sample Selector for Instance Explanation */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">Sample Observation:</span>
            <div className="flex gap-1.5">
              {CROP_PRESETS.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectSample(p.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedPresetId === p.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p.tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Indicators Explanation as specified */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
              <ArrowUp className="w-3.5 h-3.5" /> Feature ↑
            </span>
            <span className="text-slate-700 font-medium">Increases predicted DTH (Delays heading)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 font-bold font-mono">
              <ArrowDown className="w-3.5 h-3.5" /> Feature ↓
            </span>
            <span className="text-slate-700 font-medium">Decreases predicted DTH (Advances heading)</span>
          </div>
        </div>

        {/* Dynamic SHAP Values Area */}
        {isLoadingInstance ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-7 h-7 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Loading local SHAP prediction explanation (POST /api/shap/prediction)...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {instanceImpacts.map((item, idx) => {
              const isPositive = item.impact >= 0;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isPositive
                      ? 'bg-emerald-50/40 border-emerald-200/80'
                      : 'bg-teal-50/40 border-teal-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {item.feature}
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                        Observed: <strong>{item.value}</strong>
                      </div>
                    </div>

                    {/* Visual Indicator Pill: Feature ↑ or Feature ↓ */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                        isPositive
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {isPositive ? (
                        <>
                          <ArrowUp className="w-3 h-3 text-emerald-700" />
                          <span>+{item.impact} d</span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="w-3 h-3 text-teal-700" />
                          <span>{item.impact} d</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>
                      {isPositive ? 'Feature ↑ Increases predicted DTH' : 'Feature ↓ Decreases predicted DTH'}
                    </span>
                    <span className="font-mono">Shapley attribution</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Agronomic Insight Callout */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong>Biological Significance:</strong> SHAP values provide quantitative insight into how physical phenotypic traits interact. For instance, taller canopy architectures increase Days to Heading due to longer vegetative accumulation requirements, while higher grain test weights signify dense sink accumulation.
          </p>
        </div>
      </div>
    </div>
  );
};
