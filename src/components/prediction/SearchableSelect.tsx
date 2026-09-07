import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on query
  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm border bg-white transition-all text-left ${
          hasError
            ? 'border-red-400 ring-2 ring-red-100'
            : isOpen
            ? 'border-emerald-500 ring-2 ring-emerald-100 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? 'text-slate-900 font-medium' : 'text-slate-400'}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <span
              onClick={handleClear}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              isOpen ? 'rotate-180 text-emerald-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Search Box */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/50">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cultivar / accession..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>
          </div>

          {/* Option List */}
          <div className="max-h-52 overflow-y-auto p-1.5 space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400">
                No matching accession found.
              </div>
            ) : (
              filtered.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
