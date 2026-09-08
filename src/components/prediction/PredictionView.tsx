import React, { useState } from 'react';
import { PredictionForm } from './PredictionForm';
import { PredictionResultCard } from './PredictionResultCard';
import { CropInput, PredictionResult, PredictionMode, PageId } from '../../types';
import { predictDaysToHeading } from '../../services/api';
import { Sparkles, AlertCircle, RefreshCw, Cpu } from 'lucide-react';

interface PredictionViewProps {
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  onNavigate?: (page: PageId) => void;
}

export const PredictionView: React.FC<PredictionViewProps> = ({
  onShowToast,
  onNavigate,
}) => {
  const [mode, setMode] = useState<PredictionMode>('dataset');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [currentInput, setCurrentInput] = useState<CropInput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: CropInput) => {
    setIsLoading(true);
    setErrorMsg(null);
    setCurrentInput(data);

    try {
      const response = await predictDaysToHeading(data);
      setResult(response);
      const isExternal = response.isExternalData || data.mode === 'external';
      onShowToast(
        isExternal ? 'External Prediction Generated!' : 'Prediction Generated Successfully!',
        `XGBoost Regressor predicted ${response.prediction} Days to Heading.`,
        'success'
      );
    } catch (err: any) {
      console.error('Prediction failed:', err);
      const message = err.message || 'Unable to generate prediction. Please verify your input values and try again.';
      setErrorMsg(message);
      onShowToast('Prediction Failed', message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentInput(null);
    setErrorMsg(null);
  };

  const handleNavigateInsights = () => {
    if (onNavigate) {
      onNavigate('analytics');
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Inference Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Days to Heading Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
            Choose between historical dataset observations or manual external field data to predict inflorescence heading duration.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-2xs self-start">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>Champion Model: XGBoost Regressor (90.76% R²)</span>
        </div>
      </div>

      {/* Error Card */}
      {errorMsg && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50/90 border border-red-200 text-red-900 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">Prediction Error</h4>
            <p className="text-xs text-red-800 leading-relaxed">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Loading State Animation / Skeleton Loader */}
      {isLoading && (
        <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-soft text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Analyzing Phenotypic Data…
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Executing XGBoost feature scaling and regression inference pipeline across phenotypic attributes.
            </p>
          </div>
          <div className="w-48 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      )}

      {/* Prediction Result Display */}
      {result && currentInput && !isLoading && (
        <PredictionResultCard
          result={result}
          inputData={currentInput}
          onReset={handleReset}
          onNavigateInsights={handleNavigateInsights}
          onCopyResult={() => {
            navigator.clipboard.writeText(
              `DTH Prediction: ${result.prediction} Days\nMode: ${result.isExternalData ? 'External Data' : 'Dataset Sample'}\nCrop: ${currentInput.Name} (${currentInput.Location})\nModel: XGBoost Regressor (R² 0.9076, RMSE 0.0736)`
            );
            onShowToast('Copied to Clipboard', 'Prediction summary copied.', 'info');
          }}
        />
      )}

      {/* Main Prediction Form */}
      {(!result || isLoading) && (
        <PredictionForm
          mode={mode}
          onModeChange={setMode}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onReset={handleReset}
          initialValues={currentInput || undefined}
        />
      )}
    </div>
  );
};
