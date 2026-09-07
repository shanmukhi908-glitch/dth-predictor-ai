import React from 'react';
import { Award, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MODEL_METRICS } from '../../data/modelMetrics';

export const ModelComparisonTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Empirical Model Performance Table
          </h3>
          <p className="text-xs text-slate-500">
            Computed on 20% holdout test dataset (389 unseen observations)
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          <Award className="w-3.5 h-3.5" />
          <span>XGBoost Proposed as Optimal</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-5 font-bold">Model</th>
              <th className="py-3.5 px-5 font-bold">R² Score</th>
              <th className="py-3.5 px-5 font-bold">RMSE</th>
              <th className="py-3.5 px-5 font-bold">MAE</th>
              <th className="py-3.5 px-5 font-bold">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MODEL_METRICS.map((item) => (
              <tr
                key={item.id}
                className={`transition-colors ${
                  item.isBest
                    ? 'bg-emerald-50/60 font-medium hover:bg-emerald-50/90'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Model Column */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    {item.isBest ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Award className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        {item.isBest && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-xs">
                            <Award className="w-3 h-3" />
                            Best Model
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{item.type}</span>
                    </div>
                  </div>
                </td>

                {/* R² Score Column */}
                <td className="py-4 px-5 font-mono text-sm">
                  <span
                    className={`font-bold ${
                      item.isBest
                        ? 'text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200'
                        : item.r2 > 0.8
                        ? 'text-sky-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {item.r2.toFixed(6)}
                  </span>
                </td>

                {/* RMSE Column */}
                <td className="py-4 px-5 font-mono text-sm">
                  <span
                    className={`font-semibold ${
                      item.rmse < 0.1 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {item.rmse.toFixed(6)}
                  </span>
                </td>

                {/* MAE Column */}
                <td className="py-4 px-5 font-mono text-sm">
                  <span
                    className={`font-semibold ${
                      item.mae < 0.1 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {item.mae.toFixed(6)}
                  </span>
                </td>

                {/* Performance Rating Column */}
                <td className="py-4 px-5">
                  {item.isBest ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Superior (90.76% Acc)</span>
                      </div>
                      <div className="w-24 bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-1.5 rounded-full w-[91%]" />
                      </div>
                    </div>
                  ) : item.r2 > 0.8 ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                        <ShieldCheck className="w-4 h-4 text-sky-600" />
                        <span>High (90.58% Acc)</span>
                      </div>
                      <div className="w-24 bg-sky-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sky-600 h-1.5 rounded-full w-[90%]" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span>Suboptimal (46.01% Acc)</span>
                      </div>
                      <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-slate-500 h-1.5 rounded-full w-[46%]" />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
