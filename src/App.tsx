import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { LandingView } from './components/landing/LandingView';
import { PredictionView } from './components/prediction/PredictionView';
import { PerformanceView } from './components/performance/PerformanceView';
import { FrameworkView } from './components/framework/FrameworkView';
import { ShapView } from './components/shap/ShapView';
import { AboutView } from './components/about/AboutView';
import { DatasetView } from './components/dataset/DatasetView';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Smooth scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleShowToast = (
    title: string,
    message?: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingView onNavigate={setCurrentPage} />;
      case 'predict':
        return (
          <PredictionView
            onShowToast={handleShowToast}
            onNavigate={setCurrentPage}
          />
        );
      case 'analytics':
        return <PerformanceView onNavigate={setCurrentPage} />;
      case 'explainability':
        return <ShapView />;
      case 'methodology':
        return <FrameworkView onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutView />;
      case 'dataset':
        return <DatasetView />;
      default:
        return <LandingView onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {/* Main Page Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto transition-all">
        {renderActivePage()}
      </main>

      {/* Professional Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Global Modern Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default App;
