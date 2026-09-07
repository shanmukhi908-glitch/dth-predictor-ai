import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { ERROR_COMPARISON_DATA } from '../../data/modelMetrics';
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ErrorComparisonChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'both' | 'rmse' | 'mae'>('both');

  // Chart data with scaled / logged view option or direct values
  const rmseData = [
    { model: 'MLP', RMSE: 6.100848, fill: '#ef4444' },
    { model: 'Random Forest', RMSE: 0.073853, fill: '#0284c7' },
    { model: 'XGBoost', RMSE: 0.073600, fill: '#16a34a' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Prediction Error Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Comparing Root Mean Squared Error (RMSE) across models • Lower is better
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveMetric('both')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              activeMetric === 'both' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
            }`}
          >
            RMSE & MAE
          </button>
          <button
            onClick={() => setActiveMetric('rmse')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              activeMetric === 'rmse' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
            }`}
          >
            RMSE Only
          </button>
          <button
            onClick={() => setActiveMetric('mae')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              activeMetric === 'mae' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
            }`}
          >
            MAE Only
          </button>
        </div>
      </div>

      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ERROR_COMPARISON_DATA}
            margin={{ top: 20, right: 25, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="model"
              tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#cbd5e1' }}
              label={{ value: 'Error (Days / Scaled Units)', angle: -90, position: 'insideLeft', offset: 0, fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-sm text-emerald-400">{payload[0].payload.model}</div>
                      {payload.map((entry: any, i: number) => (
                        <div key={i} className="flex justify-between gap-4">
                          <span className="text-slate-400">{entry.name}:</span>
                          <span className="font-mono font-bold">{Number(entry.value).toFixed(6)}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            {(activeMetric === 'both' || activeMetric === 'rmse') && (
              <Bar dataKey="RMSE" fill="#ef4444" radius={[6, 6, 0, 0]} name="RMSE (Root Mean Sq Error)" />
            )}
            {(activeMetric === 'both' || activeMetric === 'mae') && (
              <Bar dataKey="MAE" fill="#f59e0b" radius={[6, 6, 0, 0]} name="MAE (Mean Absolute Error)" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Numerical callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/80">
          <div className="text-xs font-bold text-red-900">MLP Neural Network</div>
          <div className="text-xs text-red-700 mt-1 font-mono">
            RMSE: <strong>6.100848</strong> | MAE: <strong>4.793661</strong>
          </div>
          <span className="text-[11px] text-red-600 block mt-0.5">High variance & prediction error</span>
        </div>

        <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200/80">
          <div className="text-xs font-bold text-sky-900">Random Forest</div>
          <div className="text-xs text-sky-700 mt-1 font-mono">
            RMSE: <strong>0.073853</strong> | MAE: <strong>0.052484</strong>
          </div>
          <span className="text-[11px] text-sky-600 block mt-0.5">98.8% error reduction vs MLP</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
          <div className="text-xs font-bold text-emerald-900 flex items-center justify-between">
            <span>XGBoost (Proposed)</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-mono">
            RMSE: <strong>0.073600</strong> | MAE: <strong>0.048800</strong>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
            Lowest error across all metrics
          </span>
        </div>
      </div>
    </div>
  );
};
