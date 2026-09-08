import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Sliders,
  Sprout,
  HelpCircle,
  AlertCircle,
  Bookmark,
  Calendar,
  Layers,
  Info,
  Database,
  FlaskConical,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CropInput, PredictionMode } from '../../types';
import { CROP_PRESETS } from '../../data/sampleCrops';
import { SearchableSelect } from './SearchableSelect';
import { fetchDropdownOptions } from '../../services/api';

interface PredictionFormProps {
  mode: PredictionMode;
  onModeChange: (mode: PredictionMode) => void;
  onSubmit: (data: CropInput) => void;
  isLoading: boolean;
  onReset: () => void;
  initialValues?: CropInput;
}

const DEFAULT_DATASET_VALUES: CropInput = {
  Crop: 'Wheat',
  Name: 'DHARWAR_57',
  Taxa: 'EA_51',
  Family: 'DHARWAR',
  Location: 'Spillman',
  Env: 2014,
  Yield: 2.21,
  TSTWT: 58.60,
  Protein: 13.45,
  Height: 32.83,
  mode: 'dataset',
  allow_unseen_categories: false,
};

const DEFAULT_EXTERNAL_VALUES: CropInput = {
  Crop: 'Wheat',
  Name: 'CUSTOM_LINE_2024',
  Taxa: 'CUSTOM_TAXA_1',
  Family: 'CUSTOM_FAMILY',
  Location: 'Spillman',
  Env: 2024,
  Yield: 2.50,
  TSTWT: 60.00,
  Protein: 13.50,
  Height: 35.00,
  mode: 'external',
  allow_unseen_categories: true,
};

// Training dataset distribution reference (from 1,944 observations in Pheno.csv)
const TRAINING_REFERENCES = {
  Env: { min: 2014, max: 2016, mean: 2015, unit: 'Year' },
  Yield: { min: 0.20, max: 4.16, mean: 2.00, unit: 't/ha' },
  TSTWT: { min: 49.43, max: 65.02, mean: 59.64, unit: 'lb/bu' },
  Protein: { min: 8.99, max: 18.21, mean: 13.04, unit: '%' },
  Height: { min: 24.92, max: 50.24, mean: 36.38, unit: 'in' },
};

// Feature descriptions for tooltips
const FEATURE_TOOLTIPS: Record<keyof CropInput, string> = {
  Crop: 'Crop species/type. The trained XGBoost model was trained exclusively on 1,944 historical wheat observations (Triticum aestivum).',
  Name: 'Cultivar accession designation or biological germplasm code (e.g., DHARWAR_57, or custom breeding line).',
  Taxa: 'Taxonomical breeding line or sub-population line code representing genetic lineages (e.g., EA_51).',
  Family: 'Breeding pedigree group or familial cluster sharing common ancestral genetic background.',
  Location: 'Experimental research station field trial site (microclimatic zone, e.g., Spillman).',
  Env: 'Environmental seasonal year of the trial (e.g., 2014, 2015, 2024), representing accumulated thermal units (GDD).',
  Yield: 'Total crop grain yield measured in metric tons per hectare (t/ha). Training distribution: 0.20 – 4.16 t/ha.',
  TSTWT: 'Grain test weight measured in pounds per bushel (lb/bu). Reflects seed kernel density. Training distribution: 49.43 – 65.02 lb/bu.',
  Protein: 'Crude grain protein content percentage (%). Training distribution: 8.99% – 18.21%.',
  Height: 'Mature vegetative canopy height in inches (in). Major driver of heading duration. Training distribution: 24.92 – 50.24 in.',
  mode: 'Prediction mode: Dataset Sample or External Data.',
  allow_unseen_categories: 'Permit new / out-of-sample germplasms not present in the historical training dataset.',
};

const isCropSupported = (cropName?: string) => {
  if (!cropName) return true;
  return cropName.trim().toLowerCase() === 'wheat';
};

export const PredictionForm: React.FC<PredictionFormProps> = ({
  mode,
  onModeChange,
  onSubmit,
  isLoading,
  onReset,
  initialValues,
}) => {
  const [formData, setFormData] = useState<CropInput>(() => {
    if (initialValues) return initialValues;
    return mode === 'dataset' ? DEFAULT_DATASET_VALUES : DEFAULT_EXTERNAL_VALUES;
  });

  const [allowUnseenCategories, setAllowUnseenCategories] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activePreset, setActivePreset] = useState<string | null>(mode === 'dataset' ? 'dharwar-57' : null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Dynamic dropdown options state (loaded via backend REST endpoints)
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

  const handleModeSwitch = (newMode: PredictionMode) => {
    if (newMode === mode) return;
    onModeChange(newMode);
    setErrors({});
    if (newMode === 'dataset') {
      setFormData(DEFAULT_DATASET_VALUES);
      setActivePreset('dharwar-57');
    } else {
      setFormData(DEFAULT_EXTERNAL_VALUES);
      setActivePreset(null);
    }
  };

  const isCategoryInDataset = (field: 'Name' | 'Taxa' | 'Family' | 'Location', value: string) => {
    const trimmed = (value || '').trim();
    if (!trimmed) return false;
    switch (field) {
      case 'Name': return nameOptions.includes(trimmed);
      case 'Taxa': return taxaOptions.includes(trimmed);
      case 'Family': return familyOptions.includes(trimmed);
      case 'Location': return locationOptions.includes(trimmed);
      default: return false;
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate Crop Species Support
    const currentCrop = (formData.Crop || 'Wheat').trim();
    if (!isCropSupported(currentCrop)) {
      newErrors.Crop = 'This crop is not supported by the current trained model. Please select a crop available in the training dataset.';
    }

    if (!formData.Name || !formData.Name.trim()) {
      newErrors.Name = 'Please enter or select a Cultivar / Germplasm Designation (Name).';
    } else if (mode === 'dataset' && nameOptions.length > 0 && !nameOptions.includes(formData.Name)) {
      newErrors.Name = 'Please select an accession name from the historical dataset.';
    } else if (mode === 'external' && !allowUnseenCategories && nameOptions.length > 0 && !nameOptions.includes(formData.Name)) {
      newErrors.Name = 'Unseen accession detected. Check "Allow out-of-sample germplasms" below to predict with new germplasms.';
    }

    if (!formData.Taxa || !formData.Taxa.trim()) {
      newErrors.Taxa = 'Please enter or select a Taxa Line.';
    } else if (mode === 'dataset' && taxaOptions.length > 0 && !taxaOptions.includes(formData.Taxa)) {
      newErrors.Taxa = 'Please select a Taxa Line from the historical dataset.';
    }

    if (!formData.Family || !formData.Family.trim()) {
      newErrors.Family = 'Please enter or select a Family Group.';
    } else if (mode === 'dataset' && familyOptions.length > 0 && !familyOptions.includes(formData.Family)) {
      newErrors.Family = 'Please select a Family Group from the historical dataset.';
    }

    if (!formData.Location || !formData.Location.trim()) {
      newErrors.Location = 'Please enter or select a Field Trial Location.';
    }

    // Numerical validation
    if (!formData.Env || formData.Env < 1980 || formData.Env > 2050) {
      newErrors.Env = 'Valid trial year required (1980 – 2050).';
    }
    if (formData.Yield <= 0 || formData.Yield > 20) {
      newErrors.Yield = 'Enter a valid yield value between 0.1 and 20.0 t/ha.';
    }
    if (formData.TSTWT <= 30 || formData.TSTWT > 85) {
      newErrors.TSTWT = 'Enter a realistic test weight between 30 and 85 lb/bu.';
    }
    if (formData.Protein <= 2 || formData.Protein > 35) {
      newErrors.Protein = 'Enter a realistic crude protein percentage (2.0 – 35.0%).';
    }
    if (formData.Height <= 10 || formData.Height > 100) {
      newErrors.Height = 'Enter a realistic plant canopy height (10.0 – 100.0 in).';
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
      setFormData({
        ...preset.data,
        mode: 'dataset',
        allow_unseen_categories: false,
      });
      setActivePreset(presetId);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        mode,
        allow_unseen_categories: mode === 'external' ? allowUnseenCategories : false,
      });
    }
  };

  const handleReset = () => {
    if (mode === 'dataset') {
      setFormData(DEFAULT_DATASET_VALUES);
      setActivePreset('dharwar-57');
    } else {
      setFormData(DEFAULT_EXTERNAL_VALUES);
      setActivePreset(null);
    }
    setErrors({});
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* MODE SELECTOR SEGMENTED CONTROL */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/80 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Mode 1: Dataset Sample */}
          <button
            type="button"
            onClick={() => handleModeSwitch('dataset')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 flex items-start gap-3 cursor-pointer ${
              mode === 'dataset'
                ? 'bg-emerald-50/90 border-2 border-emerald-500 shadow-xs'
                : 'bg-slate-50/60 border border-slate-200 hover:bg-slate-100/80 text-slate-700'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl ${
                mode === 'dataset' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Database className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${mode === 'dataset' ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Use Dataset Sample
                </span>
                {mode === 'dataset' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase tracking-wider">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Select from the 1,944 historical agronomic records across 648 cultivars with 1-click presets.
              </p>
            </div>
          </button>

          {/* Mode 2: Enter External Data */}
          <button
            type="button"
            onClick={() => handleModeSwitch('external')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 flex items-start gap-3 cursor-pointer ${
              mode === 'external'
                ? 'bg-indigo-50/90 border-2 border-indigo-500 shadow-xs'
                : 'bg-slate-50/60 border border-slate-200 hover:bg-slate-100/80 text-slate-700'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl ${
                mode === 'external' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${mode === 'external' ? 'text-indigo-950' : 'text-slate-800'}`}>
                  Enter External Data
                </span>
                {mode === 'external' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-wider">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Manually input custom field trial observations, recent years (e.g. 2024), or novel germplasms.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* SAMPLE PRESETS BAR (Shown in Dataset Mode) */}
      {mode === 'dataset' && (
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
      )}

      {/* OUT-OF-SAMPLE TOGGLE BANNER (Shown in External Mode) */}
      {mode === 'external' && (
        <div className="bg-indigo-50/70 p-4 sm:p-5 rounded-3xl border border-indigo-200/80 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  External Agronomic Data Mode Active
                </h4>
                <p className="text-xs text-indigo-900 mt-1 leading-relaxed">
                  You can evaluate existing cultivars under new environments (e.g., modern trial year 2024, custom protein/height), or enter brand new germplasms.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none flex-shrink-0 bg-white px-3 py-2 rounded-xl border border-indigo-200 shadow-2xs">
              <input
                type="checkbox"
                checked={allowUnseenCategories}
                onChange={(e) => setAllowUnseenCategories(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-800">
                Allow Novel Germplasms
              </span>
            </label>
          </div>

          <div className="pt-2 border-t border-indigo-100 text-[11px] text-indigo-800/90 flex items-center gap-2">
            <span className="font-semibold">Note:</span>
            <span>
              Unseen categories receive zero-vector genetic baseline while environmental year & phenotypic traits drive heading timing.
            </span>
          </div>
        </div>
      )}

      {/* SECTION 1: Crop Information (Categorical Features) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Section 1: Crop & Germplasm Information
              </h3>
              <p className="text-xs text-slate-500">
                {mode === 'dataset'
                  ? 'Categorical features selected from the 648 historical cultivars in Pheno.csv'
                  : 'Manual or suggested germplasm taxonomy codes for external prediction'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            4 Categorical Features
          </span>
        </div>

        {/* HTML5 Datalists for External Mode autocomplete suggestions */}
        <datalist id="dataset-names">
          {nameOptions.slice(0, 100).map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
        <datalist id="dataset-taxas">
          {taxaOptions.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
        <datalist id="dataset-families">
          {familyOptions.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
        <datalist id="dataset-locations">
          {locationOptions.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>

        {/* Target Crop Species Selection */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Target Crop Species
              </label>
              <span className="text-red-500">*</span>
            </div>
            <div className="flex items-center gap-2">
              {isCropSupported(formData.Crop || 'Wheat') ? (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Supported Model Species (Pheno.csv)
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" /> Unsupported Crop
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'Wheat', label: 'Wheat (Supported)', desc: 'Triticum aestivum', supported: true },
              { id: 'Paddy', label: 'Paddy / Rice', desc: 'Oryza sativa', supported: false },
              { id: 'Cotton', label: 'Cotton', desc: 'Gossypium', supported: false },
              { id: 'Maize', label: 'Maize / Corn', desc: 'Zea mays', supported: false },
              { id: 'Other', label: 'Other Crops', desc: 'Custom species', supported: false },
            ].map((crop) => {
              const isSelected = (formData.Crop || 'Wheat') === crop.id;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => handleChange('Crop', crop.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? crop.supported
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">{crop.label}</span>
                  <span
                    className={`text-[10px] block mt-0.5 ${
                      isSelected ? 'text-white/80' : 'text-slate-400'
                    }`}
                  >
                    {crop.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {!isCropSupported(formData.Crop || 'Wheat') && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">Crop Not Supported by Current Model</p>
                <p className="mt-0.5 leading-relaxed">
                  This crop is not supported by the current trained model. Please select a crop available in the training dataset.
                </p>
              </div>
            </div>
          )}

          {errors.Crop && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.Crop}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Field 1: Name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Cultivar / Germplasm Code (Name)</span>
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2">
                {mode === 'external' && formData.Name && (
                  isCategoryInDataset('Name', formData.Name) ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Dataset
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" /> Out-of-Sample
                    </span>
                  )
                )}

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
            </div>

            {mode === 'dataset' ? (
              <SearchableSelect
                options={nameOptions}
                value={formData.Name}
                onChange={(val) => handleChange('Name', val)}
                placeholder="Select or search Crop Name..."
                hasError={Boolean(errors.Name)}
              />
            ) : (
              <input
                type="text"
                list="dataset-names"
                value={formData.Name}
                onChange={(e) => handleChange('Name', e.target.value)}
                placeholder="e.g. DHARWAR_57 or CUSTOM_WHEAT_2024"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition ${
                  errors.Name ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              />
            )}

            <span className="text-[11px] text-slate-400 mt-1 block">
              {mode === 'dataset'
                ? 'Select an accession from the 648 training cultivars.'
                : 'Type custom germplasm accession or pick suggestion.'}
            </span>

            {errors.Name && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Name}
              </p>
            )}
          </div>

          {/* Field 2: Taxa */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Taxa Line</span>
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2">
                {mode === 'external' && formData.Taxa && (
                  isCategoryInDataset('Taxa', formData.Taxa) ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Dataset
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" /> Out-of-Sample
                    </span>
                  )
                )}

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
            </div>

            {mode === 'dataset' ? (
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
            ) : (
              <input
                type="text"
                list="dataset-taxas"
                value={formData.Taxa}
                onChange={(e) => handleChange('Taxa', e.target.value)}
                placeholder="e.g. EA_51 or CUSTOM_TAXA"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition ${
                  errors.Taxa ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              />
            )}

            <span className="text-[11px] text-slate-400 mt-1 block">
              {mode === 'dataset' ? 'Breeding lineage code from dataset.' : 'Type custom breeding line or select from suggestions.'}
            </span>

            {errors.Taxa && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Taxa}
              </p>
            )}
          </div>

          {/* Field 3: Family */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Family Group</span>
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2">
                {mode === 'external' && formData.Family && (
                  isCategoryInDataset('Family', formData.Family) ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Dataset
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" /> Out-of-Sample
                    </span>
                  )
                )}

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
            </div>

            {mode === 'dataset' ? (
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
            ) : (
              <input
                type="text"
                list="dataset-families"
                value={formData.Family}
                onChange={(e) => handleChange('Family', e.target.value)}
                placeholder="e.g. DHARWAR or CUSTOM_PEDIGREE"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition ${
                  errors.Family ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              />
            )}

            <span className="text-[11px] text-slate-400 mt-1 block">
              {mode === 'dataset' ? 'Pedigree familial cluster.' : 'Type custom pedigree family or select from suggestions.'}
            </span>

            {errors.Family && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.Family}
              </p>
            )}
          </div>

          {/* Field 4: Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Field Location</span>
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2">
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
            </div>

            {mode === 'dataset' ? (
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
            ) : (
              <input
                type="text"
                list="dataset-locations"
                value={formData.Location}
                onChange={(e) => handleChange('Location', e.target.value)}
                placeholder="e.g. Spillman or Custom Site"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition ${
                  errors.Location ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              />
            )}

            <span className="text-[11px] text-slate-400 mt-1 block">
              Field trial station (e.g. Spillman).
            </span>

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
            <div className={`p-2.5 rounded-2xl ${mode === 'dataset' ? 'bg-teal-50 text-teal-700' : 'bg-indigo-50 text-indigo-700'}`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Section 2: Phenotypic Measurements
              </h3>
              <p className="text-xs text-slate-500">
                Quantitative agronomic traits (automatically standardized on backend using training scaler)
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
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Trial year</span>
              <span className="font-mono text-slate-500">Ref: 2014 – 2016</span>
            </div>
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
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Grain yield (t/ha)</span>
              <span className="font-mono text-slate-500">Ref: 0.20 – 4.16</span>
            </div>
            {mode === 'external' && (formData.Yield < TRAINING_REFERENCES.Yield.min || formData.Yield > TRAINING_REFERENCES.Yield.max) && (
              <span className="text-[10px] text-amber-600 font-medium block mt-0.5">
                Outside training range (0.20 – 4.16 t/ha)
              </span>
            )}
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
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Test weight</span>
              <span className="font-mono text-slate-500">Ref: 49.4 – 65.0</span>
            </div>
            {mode === 'external' && (formData.TSTWT < TRAINING_REFERENCES.TSTWT.min || formData.TSTWT > TRAINING_REFERENCES.TSTWT.max) && (
              <span className="text-[10px] text-amber-600 font-medium block mt-0.5">
                Outside training range (49.43 – 65.02 lb/bu)
              </span>
            )}
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
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Crude protein</span>
              <span className="font-mono text-slate-500">Ref: 8.99 – 18.2%</span>
            </div>
            {mode === 'external' && (formData.Protein < TRAINING_REFERENCES.Protein.min || formData.Protein > TRAINING_REFERENCES.Protein.max) && (
              <span className="text-[10px] text-amber-600 font-medium block mt-0.5">
                Outside training range (8.99 – 18.21%)
              </span>
            )}
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
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Canopy height</span>
              <span className="font-mono text-slate-500">Ref: 24.9 – 50.2</span>
            </div>
            {mode === 'external' && (formData.Height < TRAINING_REFERENCES.Height.min || formData.Height > TRAINING_REFERENCES.Height.max) && (
              <span className="text-[10px] text-amber-600 font-medium block mt-0.5">
                Outside training range (24.92 – 50.24 in)
              </span>
            )}
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
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full sm:flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-white font-black text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-200 cursor-pointer ${
            mode === 'external'
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-700/25'
              : 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-emerald-700/25'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Phenotypic Data…</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-white/80" />
              <span>
                {mode === 'external' ? 'Predict DTH (External Data)' : 'Predict Days to Heading'}
              </span>
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
