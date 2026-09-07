import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/95 text-emerald-900',
    error: 'border-red-200 bg-red-50/95 text-red-900',
    info: 'border-sky-200 bg-sky-50/95 text-sky-900',
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-slide-up ${borders[toast.type]}`}
    >
      {icons[toast.type]}
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{toast.title}</h4>
        {toast.message && <p className="text-xs mt-0.5 opacity-90">{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 transition"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
