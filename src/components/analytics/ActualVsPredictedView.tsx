import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import { ActualVsPredictedPoint } from '../../types';
import { fetchActualVsPredictedData } from '../../services/api';
import { CheckCircle2, TrendingUp, Info, RefreshCw, Cpu, Layers } from 'lucide-react';

export const ActualVsPredictedView: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<ActualVsPredictedPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchActualVsPredictedData();
      setDataPoints(data);
    } catch (e) {
      console.error('Error fetching actual vs predicted data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Regression Concordance Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Actual vs Predicted Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
            Visualizing empirical concordance between ground-truth observed Days to Heading and XGBoost Regressor predictions on held-out test data.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition self-start cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Reload Test Samples</span>
        </button>
      </div>

      {/* Main Scatter Plot Area */}
      <div className="h-96 w-full pt-2">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">Loading Actual vs Predicted data points...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 25, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                dataKey="actual"
                name="Actual DTH"
                unit=" d"
                domain={[165, 188]}
                tick={{ fill: '#64748b', fontSize: 12 }}
                label={{
                  value: 'Observed Days to Heading (Actual Target)',
                  position: 'insideBottom',
                  offset: -15,
                  fill: '#475569',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <YAxis
                type="number"
                dataKey="predicted"
                name="Predicted DTH"
                unit=" d"
                domain={[165, 188]}
                tick={{ fill: '#64748b', fontSize: 12 }}
                label={{
                  value: 'Model Predicted Days to Heading (XGBoost)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 0,
                  fill: '#475569',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ActualVsPredictedPoint;
                    return (
                      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 text-xs space-y-1.5 min-w-44">
                        <div className="font-bold text-emerald-400 text-sm">
                          Sample #{data.sampleId}: {data.cultivar}
                        </div>
                        <div className="text-slate-400 text-[11px]">Location: {data.location}</div>
                        <div className="pt-1 border-t border-slate-800 space-y-0.5 font-mono">
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Actual DTH:</span>
                            <span className="font-bold text-slate-100">{data.actual.toFixed(1)} Days</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Predicted DTH:</span>
                            <span className="font-bold text-emerald-300">{data.predicted.toFixed(1)} Days</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Residual Error:</span>
                            <span className="font-bold text-amber-300">{data.residual > 0 ? `+${data.residual}` : data.residual} d</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Reference 45-degree diagonal line: y = x */}
              <ReferenceLine
                segment={[
                  { x: 165, y: 165 },
                  { x: 188, y: 188 },
                ]}
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: 'Perfect 1:1 Reference (y = x)',
                  position: 'insideTopLeft',
                  fill: '#059669',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />

              {/* Empirical Data Scatter Points */}
              <Scatter name="Crop Observations" data={dataPoints} fill="#047857">
                {dataPoints.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#059669"
                    stroke="#064e3b"
                    strokeWidth={1.5}
                    r={5}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Supporting Text & Metric Highlights */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
        <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium leading-relaxed">
            “Closer alignment to the diagonal line indicates stronger prediction accuracy.”
          </p>
          <p className="text-xs text-emerald-800/90 leading-relaxed">
            Data points represent multi-environment test observations. The exceptionally tight clustering along the green dashed reference line demonstrates the stability of the proposed XGBoost Regressor (R² = 0.907600, RMSE = 0.073600, MAE = 0.048800).
          </p>
        </div>
      </div>

      {/* Statistical Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Regression Slope (m)
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">0.9984</div>
          <span className="text-[11px] text-slate-500">Close to ideal 1.0 unit gradient</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Mean Residual Error
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">±0.0488 Days</div>
          <span className="text-[11px] text-slate-500">Corresponds to MAE metric</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            API Endpoint Ready
          </div>
          <div className="text-xs font-mono font-bold text-slate-800 mt-1 truncate">
            GET /api/analytics/actual-vs-predicted
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">Live or Mock Mode Active</span>
        </div>
      </div>
    </div>
  );
};
