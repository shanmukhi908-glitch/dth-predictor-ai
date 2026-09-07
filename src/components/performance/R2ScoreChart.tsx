import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { R2_COMPARISON_DATA } from '../../data/modelMetrics';
import { TrendingUp, Info } from 'lucide-react';

export const R2ScoreChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Model Performance Comparison (R² Score)
          </h3>
          <p className="text-xs text-slate-500">
            Higher is better • Measures variance explained in Days to Heading
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>XGBoost Leads: 0.907600</span>
        </div>
      </div>

      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={R2_COMPARISON_DATA}
            margin={{ top: 25, right: 25, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="model"
              tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[0, 1.0]}
              tickFormatter={(val) => val.toFixed(2)}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#cbd5e1' }}
              label={{ value: 'R² Score', angle: -90, position: 'insideLeft', offset: 0, fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-sm text-emerald-400">{data.fullName}</div>
                      <div>R² Score: <span className="font-mono font-bold">{data.r2.toFixed(6)}</span></div>
                      <div>Prediction Accuracy: <span className="font-mono font-bold text-emerald-300">{data.percentage}%</span></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="r2" radius={[8, 8, 0, 0]}>
              {R2_COMPARISON_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.model === 'XGBoost' ? '#16a34a' : entry.model === 'Random Forest' ? '#0284c7' : '#94a3b8'}
                />
              ))}
              <LabelList
                dataKey="r2"
                position="top"
                formatter={(val: number) => val.toFixed(4)}
                style={{ fill: '#0f172a', fontSize: 12, fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p>
          The <strong>XGBoost Regressor</strong> explains <strong>90.76%</strong> of the variance in Days to Heading, outperforming the Multi-Layer Perceptron (46.01%) by +44.75% and slightly outperforming Random Forest (90.58%).
        </p>
      </div>
    </div>
  );
};
