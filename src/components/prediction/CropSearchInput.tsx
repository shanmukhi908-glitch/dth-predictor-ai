import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sprout, Check, AlertCircle, CheckCircle2, ChevronDown, X, AlertTriangle } from 'lucide-react';

export interface CropOption {
  name: string;
  aliases: string[];
  scientific: string;
  isSupported: boolean;
}

export const CROP_DATABASE: CropOption[] = [
  { name: 'Wheat', aliases: ['wheat', 'gehun', 'triticum', 'winter wheat', 'spring wheat'], scientific: 'Triticum aestivum', isSupported: true },
  { name: 'Cotton', aliases: ['cotton', 'kapas', 'gossypium'], scientific: 'Gossypium hirsutum', isSupported: false },
  { name: 'Paddy', aliases: ['paddy', 'rice', 'dhan', 'oryza'], scientific: 'Oryza sativa (Rice)', isSupported: false },
  { name: 'Maize', aliases: ['maize', 'corn', 'makka', 'zea'], scientific: 'Zea mays (Corn)', isSupported: false },
  { name: 'Barley', aliases: ['barley', 'jau', 'hordeum'], scientific: 'Hordeum vulgare', isSupported: false },
  { name: 'Sorghum', aliases: ['sorghum', 'jowar', 'milo'], scientific: 'Sorghum bicolor', isSupported: false },
  { name: 'Pearl Millet', aliases: ['pearl millet', 'bajra', 'millet'], scientific: 'Pennisetum glaucum', isSupported: false },
  { name: 'Chickpea', aliases: ['chickpea', 'chana', 'gram', 'bengal gram'], scientific: 'Cicer arietinum', isSupported: false },
  { name: 'Soybean', aliases: ['soybean', 'soya', 'glycine'], scientific: 'Glycine max', isSupported: false },
  { name: 'Sugarcane', aliases: ['sugarcane', 'ganna', 'saccharum'], scientific: 'Saccharum officinarum', isSupported: false },
  { name: 'Mustard', aliases: ['mustard', 'sarson', 'rai', 'brassica'], scientific: 'Brassica nigra', isSupported: false },
  { name: 'Groundnut', aliases: ['groundnut', 'peanut', 'moongphali', 'arachis'], scientific: 'Arachis hypogaea', isSupported: false },
  { name: 'Sunflower', aliases: ['sunflower', 'surajmukhi', 'helianthus'], scientific: 'Helianthus annuus', isSupported: false },
  { name: 'Oats', aliases: ['oats', 'jai', 'avena'], scientific: 'Avena sativa', isSupported: false },
  { name: 'Potato', aliases: ['potato', 'aloo', 'solanum'], scientific: 'Solanum tuberosum', isSupported: false },
  { name: 'Tomato', aliases: ['tomato', 'tamatar'], scientific: 'Solanum lycopersicum', isSupported: false },
];

export const isCropSupported = (cropName?: string): boolean => {
  if (!cropName) return true;
  const clean = cropName.trim().toLowerCase();
  return clean === 'wheat' || clean.startsWith('wheat');
};

interface CropSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const CropSearchInput: React.FC<CropSearchInputProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(value || 'Wheat');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal query state with incoming value
  useEffect(() => {
    setQuery(value || 'Wheat');
  }, [value]);

  // Filter matching suggestions dynamically
  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return CROP_DATABASE.slice(0, 6);
    }
    return CROP_DATABASE.filter((crop) => {
      if (crop.name.toLowerCase().includes(trimmed)) return true;
      if (crop.scientific.toLowerCase().includes(trimmed)) return true;
      return crop.aliases.some((alias) => alias.toLowerCase().includes(trimmed));
    });
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal);
    if (!isOpen) setIsOpen(true);
  };

  const handleSelectSuggestion = (cropName: string) => {
    setQuery(cropName);
    onChange(cropName);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    onChange('');
    setIsOpen(true);
    if (inputRef.current) inputRef.current.focus();
  };

  const supported = isCropSupported(value);
  const displayCropName = (value || 'Wheat').trim();

  return (
    <div className="space-y-3" ref={containerRef}>
      {/* Header & Status Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <label htmlFor="crop-search-input" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Crop Name / Crop Type
          </label>
          <span className="text-red-500">*</span>
        </div>

        <div className="flex items-center gap-2">
          {supported ? (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/70 flex items-center gap-1 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Supported Model Species (Pheno.csv)
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/70 flex items-center gap-1 shadow-2xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Unsupported Crop
            </span>
          )}
        </div>
      </div>

      {/* Searchable Autocomplete Input Field */}
      <div className="relative">
        <div className="relative flex items-center">
          <input
            id="crop-search-input"
            ref={inputRef}
            type="text"
            value={query}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder="Type or search crop name (e.g. Wheat, Cotton, Paddy, Maize)..."
            autoComplete="off"
            className={`w-full pl-3.5 pr-20 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 font-medium transition-all shadow-2xs focus:outline-none ${
              error
                ? 'border-red-400 ring-2 ring-red-100'
                : isOpen
                ? 'border-emerald-500 ring-2 ring-emerald-100'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          />

          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition"
                title="Clear crop name"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition"
              title="Toggle suggestions"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Autocomplete Suggestions Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Suggestions:</span>
              <span className="text-[10px] text-slate-400 font-normal normal-case">
                Click to select or continue typing
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 p-1">
              {suggestions.length > 0 ? (
                suggestions.map((crop) => {
                  const isSelected = value.trim().toLowerCase() === crop.name.toLowerCase();
                  return (
                    <button
                      key={crop.name}
                      type="button"
                      onClick={() => handleSelectSuggestion(crop.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-950 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            crop.isSupported
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {crop.isSupported ? '✓' : '•'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{crop.name}</span>
                            {crop.isSupported ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                Supported
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                                Requires Model
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 italic block">
                            {crop.scientific}
                          </span>
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-3 text-center text-xs text-slate-500">
                  <p>No preset crop matches "{query}".</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    You can still use "{query}" as a custom crop entry.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Unsupported Crop Friendly Notification Banner */}
      {!supported && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs flex items-start gap-3 shadow-2xs animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="font-bold text-amber-900">
              A trained model for this crop is not yet available
            </h5>
            <p className="text-amber-900/90 leading-relaxed">
              Prediction for <strong>{displayCropName}</strong> requires a dedicated dataset and trained regression model for {displayCropName}. The current deployed model is trained on Wheat data.
            </p>
          </div>
        </div>
      )}

      {/* Field Error Message */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
