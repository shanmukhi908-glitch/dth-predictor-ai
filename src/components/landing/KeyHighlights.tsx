import React from 'react';
import { Target, Database, Sliders, Award, ArrowUpRight } from 'lucide-react';
import { PageId } from '../../types';

interface KeyHighlightsProps {
  onNavigate: (page: PageId) => void;
}

export const KeyHighlights: React.FC<KeyHighlightsProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: 'accuracy',
      title: 'XGBoost Accuracy',
      value: '90.76%',
      subtitle: 'Highest R² score among all evaluated models',
      badge: 'Benchmark Lead',
      icon: Target,
      color: 'emerald',
      targetPage: 'performance' as PageId,
    },
    {
      id: 'records',
      title: 'Dataset',
      value: '1,944',
      subtitle: 'Multi-environment crop records in Pheno.csv',
      badge: 'Zero Missing',
      icon: Database,
      color: 'sky',
      targetPage: 'dataset' as PageId,
    },
    {
      id: 'features',
      title: 'Input Features',
      value: '9 Features',
      subtitle: '4 Categorical & 5 Numerical phenotypic measurements',
      badge: '1,328 Encoded',
      icon: Sliders,
      color: 'amber',
      targetPage: 'dataset' as PageId,
    },
    {
      id: 'best-model',
      title: 'Best Model',
      value: 'XGBoost',
      subtitle: 'Tuned with GridSearchCV (3-fold cross validation)',
      badge: 'Champion Regressor',
      icon: Award,
      color: 'teal',
      targetPage: 'framework' as PageId,
    },
  ];

  const colorStyles: Record<string, { bg: string; iconBg: string; text: string; border: string }> = {
    emerald: {
      bg: 'hover:bg-emerald-50/40',
      iconBg: 'bg-emerald-100 text-emerald-700',
      text: 'text-emerald-700',
      border: 'hover:border-emerald-300',
    },
    sky: {
      bg: 'hover:bg-sky-50/40',
      iconBg: 'bg-sky-100 text-sky-700',
      text: 'text-sky-700',
      border: 'hover:border-sky-300',
    },
    amber: {
      bg: 'hover:bg-amber-50/40',
      iconBg: 'bg-amber-100 text-amber-700',
      text: 'text-amber-700',
      border: 'hover:border-amber-300',
    },
    teal: {
      bg: 'hover:bg-teal-50/40',
      iconBg: 'bg-teal-100 text-teal-700',
      text: 'text-teal-700',
      border: 'hover:border-teal-300',
    },
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Key Research Highlights</h2>
          <p className="text-xs text-slate-500">Core empirical findings and dataset properties from the study</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const style = colorStyles[card.color];
          return (
            <div
              key={card.id}
              onClick={() => onNavigate(card.targetPage)}
              className={`relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft transition-all duration-300 cursor-pointer group ${style.bg} ${style.border}`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${style.iconBg} transition-transform group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-white border border-slate-200/60">
                  <span>{card.badge}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                  {card.value}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
