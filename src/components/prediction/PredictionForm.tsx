import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Sliders,
  Sprout,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Calendar,
  Layers,
  Info
} from 'lucide-react';
import { CropInput } from '../../types';
import { CROP_PRESETS } from '../../data/sampleCrops';
import { SearchableSelect } from './SearchableSelect';
import { fetchDropdownOptions } from '../../services/api';

interface PredictionFormProps {
  onSubmit: (data: CropInput) => void;
  isLoading: boolean;
  onReset: () => void;
  initialValues?: CropInput;
}

const DEFAULT_FORM_VALUES: CropInput = {
  Name: 'DHARWAR_57',
  Taxa: 'EA_51',
  Family: 'DHARWAR',
  Location: 'Spillman',
  Env: 2014,
  Yield: 2.21,
  TSTWT: 58.60,
  Protein: 13.45,
  Height: 32.83,
};

// Feature descriptions for tooltips
const FEATURE_TOOLTIPS: Record<keyof CropInput, string> = {
  Name: 'Cultivar accession designation or biological germplasm code (e.g., DHARWAR_57).',
  Taxa: 'Taxonomical breeding line or sub-population line code representing genetic lineages.',
  Family: 'Breeding pedigree group or familial cluster sharing common ancestral genetic background.',
  Location: 'Experimental research station field trial site (microclimatic zone, e.g., Spillman, Pullman).',
  Env: 'Environmental seasonal year of the trial (e.g., 2014, 2015), representing heat units (GDD).',
  Yield: 'Total crop grain yield measured in metric tons per hectare (t/ha). Typical range: 0.5 - 6.0.',
  TSTWT: 'Grain test weight measured in pounds per bushel (lb/bu). Reflects seed kernel density.',
  Protein: 'Crude grain protein content percentage (%). Typical range: 9.0% - 18.0%.',
  Height: 'Mature vegetative canopy height in inches (in). Major driver of heading duration.',
};

export const PredictionForm: React.FC<PredictionFormProps> = ({
  onSubmit,
  isLoading,
  onReset,
  initialValues,
}) => {
  const [formData, setFormData] = useState<CropInput>(initialValues || DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activePreset, setActivePreset] = useState<string | null>('dharwar-57');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Dynamic dropdown options state (loaded via API integration points)
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [taxaOptions, setTaxaOptions] = useState<string[]>([]);
  const [familyOptions, setFamilyOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);

  // Load dropdown options dynamically from backend REST endpoints
  useEffect(() => {
    async function loadOptions() {
      const [names, taxas, families, locations] = await Promise.all([
        fetchDropdownOptions('name'),
        fetchDropdownOptions('taxa'),
        fetchDropdownOptions('family'),
        fetchDropdownOptions('location'),
      ]);
      setNameOptions(names);
      setTaxaOptions(taxas);
      setFamilyOptions(families);
      setLocationOptions(locations);
    }
    loadOptions();
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Name) newErrors.Name = 'Please select a crop name.';
    if (!formData.Taxa) newErrors.Taxa = 'Please select a taxa line.';
    if (!formData.Family) newErrors.Family = 'Please select a crop family.';
    if (!formData.Location) newErrors.Location = 'Please select a field trial location.';

    if (!formData.Env || formData.Env < 1980 || formData.Env > 2050) {
      newErrors.Env = 'Valid trial year required (e.g. 2014 - 2024).';
    }
    if (formData.Yield <= 0 || formData.Yield > 15) {
      newErrors.Yield = 'Enter a valid yield value between 0.1 and 15.0 t/ha.';
    }
    if (formData.TSTWT <= 30 || formData.TSTWT > 85) {
      newErrors.TSTWT = 'Enter a realistic test weight between 30 and 85 lb/bu.';
    }
    if (formData.Protein <= 2 || formData.Protein > 35) {
      newErrors.Protein = 'Enter a realistic crude protein percentage (2.0 - 35.0%).';
    }
    if (formData.Height <= 10 || formData.Height > 100) {
      newErrors.Height = 'Enter a realistic plant canopy height (10.0 - 100.0 in).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CropInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    setActivePreset(null);
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = CROP_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setFormData(preset.data);
      setActivePreset(presetId);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
    setActivePreset(null);
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sample Presets Bar */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>Load Research Sample Presets</span>
          </div>
          <span className="text-[11px] text-slate-500">
            1-Click fill with real observations from the 1,944 dataset
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CROP_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activePreset === preset.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className={activePreset === preset.id ? 'text-white' : 'text-emerald-600'}>
                •
              </span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Crop Information (Categorical Features) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Section 1: Crop Information
              </h3>
              <p className="text-xs text-slate-500">
                Categorical features for taxonomy and trial location (dynamically linked to backend)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            4 Categorical Features
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Field 1: Name (Searchable dropdown) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Crop Name</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Name')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Crop Name"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Name' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Name}
                  </div>
                )}
              </div>
            </div>

            <SearchableSelect
              options={nameOptions}
              value={formData.Name}
              onChange={(val) => handleChange('Name', val)}
              placeholder="Select or search Crop Name..."
              hasError={Boolean(errors.Name)}
            />

            {errors.Name && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Name}
              </p>
            )}
          </div>

          {/* Field 2: Taxa (Dropdown) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Taxa Line</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Taxa')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Taxa"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Taxa' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Taxa}
                  </div>
                )}
              </div>
            </div>

            <select
              value={formData.Taxa}
              onChange={(e) => handleChange('Taxa', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Taxa ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <option value="">Select Taxa Line</option>
              {taxaOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {errors.Taxa && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Taxa}
              </p>
            )}
          </div>

          {/* Field 3: Family (Dropdown) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Family</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Family')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Family"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Family' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Family}
                  </div>
                )}
              </div>
            </div>

            <select
              value={formData.Family}
              onChange={(e) => handleChange('Family', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Family ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <option value="">Select Family Group</option>
              {familyOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {errors.Family && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Family}
              </p>
            )}
          </div>

          {/* Field 4: Location (Dropdown) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Location</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Location')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Location"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Location' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Location}
                  </div>
                )}
              </div>
            </div>

            <select
              value={formData.Location}
              onChange={(e) => handleChange('Location', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Location ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <option value="">Select Field Trial Location</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {errors.Location && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Location}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Phenotypic Measurements (Numerical Features) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Section 2: Phenotypic Measurements
              </h3>
              <p className="text-xs text-slate-500">
                Quantitative agronomic measurements (validated ranges, scaled automatically on backend)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            5 Numerical Features
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Field 5: Env (Trial Year) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Env (Trial Year)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Env')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Env"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Env' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Env}
                  </div>
                )}
              </div>
            </div>

            <input
              type="number"
              value={formData.Env}
              onChange={(e) => handleChange('Env', parseInt(e.target.value) || 0)}
              placeholder="e.g. 2014"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Env ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Year of testing trial</span>
            {errors.Env && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Env}
              </p>
            )}
          </div>

          {/* Field 6: Yield (t/ha) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Yield (t/ha)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Yield')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Yield"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Yield' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Yield}
                  </div>
                )}
              </div>
            </div>

            <input
              type="number"
              step="0.01"
              value={formData.Yield}
              onChange={(e) => handleChange('Yield', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 2.21"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Yield ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Yield standard: 0.5 - 6.0 t/ha</span>
            {errors.Yield && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Yield}
              </p>
            )}
          </div>

          {/* Field 7: TSTWT (lb/bu) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>TSTWT (lb/bu)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('TSTWT')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about TSTWT"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'TSTWT' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.TSTWT}
                  </div>
                )}
              </div>
            </div>

            <input
              type="number"
              step="0.01"
              value={formData.TSTWT}
              onChange={(e) => handleChange('TSTWT', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 58.60"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.TSTWT ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Test weight (standard: 54 - 64 lb/bu)</span>
            {errors.TSTWT && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.TSTWT}
              </p>
            )}
          </div>

          {/* Field 8: Protein (%) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Protein (%)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Protein')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Protein"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Protein' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Protein}
                  </div>
                )}
              </div>
            </div>

            <input
              type="number"
              step="0.01"
              value={formData.Protein}
              onChange={(e) => handleChange('Protein', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 13.45"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Protein ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Grain protein (e.g. 11.5 - 16.0%)</span>
            {errors.Protein && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Protein}
              </p>
            )}
          </div>

          {/* Field 9: Height (in) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Height (in)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip('Height')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Info about Height"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'Height' && (
                  <div className="absolute right-0 bottom-6 z-50 w-56 p-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-800">
                    {FEATURE_TOOLTIPS.Height}
                  </div>
                )}
              </div>
            </div>

            <input
              type="number"
              step="0.01"
              value={formData.Height}
              onChange={(e) => handleChange('Height', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 32.83"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition ${
                errors.Height ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Canopy height (e.g. 28 - 45 in)</span>
            {errors.Height && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Height}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        {/* Large Attractive Button: “Predict Days to Heading” */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-base shadow-lg shadow-emerald-700/25 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-200 cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Phenotypic Data…</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-emerald-200" />
              <span>Predict Days to Heading</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm border border-slate-200 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Reset Form</span>
        </button>
      </div>
    </form>
  );
};
