import React from 'react';
import {
  Database,
  FileSpreadsheet,
  CheckCircle2,
  Layers,
  Sliders,
  Table,
  PieChart as PieChartIcon,
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import {
  DATASET_METADATA,
  DATASET_ATTRIBUTES,
  FEATURE_DISTRIBUTION_DATA
} from '../../data/datasetMetadata';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const DatasetView: React.FC = () => {
  const pieData = [
    { name: 'Categorical Features (4)', value: 4, fill: '#10b981' },
    { name: 'Numerical Features (5)', value: 5, fill: '#3b82f6' },
  ];

  const sampleDatasetRows = [
    { name: 'DHARWAR_57', taxa: 'EA_51', family: 'DHARWAR', location: 'Spillman', env: 2014, yield: 2.21, tstwt: 58.60, protein: 13.45, height: 32.83, dth: 175.79 },
    { name: 'DHARWAR_58', taxa: 'EA_52', family: 'DHARWAR', location: 'Spillman', env: 2014, yield: 1.85, tstwt: 57.37, protein: 13.44, height: 35.09, dth: 175.79 },
    { name: 'DHARWAR_59', taxa: 'EA_53', family: 'DHARWAR', location: 'Spillman', env: 2014, yield: 2.41, tstwt: 56.57, protein: 12.64, height: 35.09, dth: 177.79 },
    { name: 'DHARWAR_60', taxa: 'EA_54', family: 'DHARWAR', location: 'Spillman', env: 2014, yield: 1.99, tstwt: 56.17, protein: 13.24, height: 35.09, dth: 177.79 },
    { name: 'DHARWAR_61', taxa: 'EA_55', family: 'DHARWAR', location: 'Spillman', env: 2014, yield: 1.73, tstwt: 56.17, protein: 13.84, height: 33.09, dth: 175.79 }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <Database className="w-3.5 h-3.5" />
          <span>Crop Agronomic Data Source</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dataset Overview
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
          Comprehensive summary and statistical distributions of the wheat phenotypic experimental repository.
        </p>
      </div>

      {/* Dataset Core Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dataset File</span>
          <div className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>{DATASET_METADATA.name}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Standard CSV format</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Observations</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {DATASET_METADATA.totalObservations.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">100% complete records</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Attributes</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {DATASET_METADATA.totalAttributes}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">9 Inputs + 1 Target</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Variable</span>
          <div className="text-lg font-bold text-emerald-700 mt-1 truncate">
            Days to Heading
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Continuous regression</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Features</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {DATASET_METADATA.inputFeatures}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">4 Categorical, 5 Numerical</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missing Values</span>
          <div className="text-xl font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>None</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">0 missing entries</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duplicate Records</span>
          <div className="text-xl font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>None</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">0 duplicate rows</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Encoded Dimensions</span>
          <div className="text-2xl font-extrabold text-teal-700 font-mono mt-1">
            {DATASET_METADATA.encodedFeatureCount}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Post one-hot encoding</span>
        </div>
      </div>

      {/* Visual Charts: Categorical vs Numerical Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pie Chart: Feature Types */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Feature Category Distribution
            </h3>
            <p className="text-xs text-slate-500">Breakdown of 9 phenotypic predictors</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="font-bold text-emerald-800 block">4 Categorical</span>
              <span className="text-emerald-700 text-[11px]">Name, Taxa, Family, Location</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <span className="font-bold text-blue-800 block">5 Numerical</span>
              <span className="text-blue-700 text-[11px]">Env, Yield, TSTWT, Protein, Height</span>
            </div>
          </div>
        </div>

        {/* Feature Split Information */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Data Processing & Validation Split
            </h3>
            <p className="text-xs text-slate-500">Experimental validation pipeline configuration</p>
          </div>

          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Training Partition (80%)</span>
                <span className="text-xs text-slate-500">1,555 crop observations for cross-validation</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                1,555 Rows
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Testing Partition (20%)</span>
                <span className="text-xs text-slate-500">389 independent holdout observations</span>
              </div>
              <span className="font-mono font-bold text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-md">
                389 Rows
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Cross-Validation Strategy</span>
                <span className="text-xs text-slate-500">3-Fold Cross-Validation for hyperparameter tuning</span>
              </div>
              <span className="font-mono font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded-md">
                3-Fold CV
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Attribute Dictionary Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Feature Attribute Dictionary
          </h3>
          <p className="text-xs text-slate-500">
            Complete data dictionary for all 10 columns in Pheno.csv
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold">Feature</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Data Type</th>
                <th className="py-3 px-4 font-bold">Description</th>
                <th className="py-3 px-4 font-bold">Sample Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DATASET_ATTRIBUTES.map((attr) => (
                <tr key={attr.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {attr.name}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        attr.type.includes('Target')
                          ? 'bg-amber-100 text-amber-900 border border-amber-200 font-bold'
                          : attr.type === 'Categorical'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {attr.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-xs">
                    {attr.dataType}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs max-w-xs">
                    {attr.description}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs font-mono">
                    {attr.sampleValues}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actual Research Data Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Sample Dataset Records (Pheno.csv Snippet)
            </h3>
            <p className="text-xs text-slate-500">First 5 observations from the research experiments</p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            Head (5 rows)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Taxa</th>
                <th className="py-2.5 px-3">Family</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Env</th>
                <th className="py-2.5 px-3">Yield</th>
                <th className="py-2.5 px-3">TSTWT</th>
                <th className="py-2.5 px-3">Protein</th>
                <th className="py-2.5 px-3">Height</th>
                <th className="py-2.5 px-3 text-emerald-700 font-bold bg-emerald-50/70">DTH (Target)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleDatasetRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.taxa}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.family}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.location}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.env}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.yield.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.tstwt.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.protein.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.height.toFixed(2)}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700 bg-emerald-50/50">{row.dth.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
