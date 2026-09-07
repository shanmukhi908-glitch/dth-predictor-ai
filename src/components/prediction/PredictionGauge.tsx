import React from 'react';

interface PredictionGaugeProps {
  value: number; // e.g., 72.4 or 175.8 days
  min?: number;
  max?: number;
}

export const PredictionGauge: React.FC<PredictionGaugeProps> = ({
  value,
  min = 50,
  max = 200,
}) => {
  // Clamp value
  const clamped = Math.min(Math.max(value, min), max);
  const percentage = (clamped - min) / (max - min);

  // Semicircle geometry
  const radius = 80;
  const strokeWidth = 14;
  const cx = 100;
  const cy = 95;
  const circumference = Math.PI * radius; // Half-circle perimeter
  const strokeDashoffset = circumference * (1 - percentage);

  // Rotation angle for needle: -90deg (at 0%) to +90deg (at 100%)
  const needleAngle = -90 + percentage * 180;

  // Determine stage category
  let category = 'Optimal Heading';
  let categoryColor = 'text-emerald-700 bg-emerald-100 border-emerald-200';
  if (value < 120) {
    // If working with shorter cycle (e.g. 72.4 days)
    if (value < 65) {
      category = 'Early Heading';
      categoryColor = 'text-amber-800 bg-amber-100 border-amber-200';
    } else if (value <= 85) {
      category = 'Optimal Heading';
      categoryColor = 'text-emerald-800 bg-emerald-100 border-emerald-200';
    } else {
      category = 'Late Heading';
      categoryColor = 'text-sky-800 bg-sky-100 border-sky-200';
    }
  } else {
    // If working with ~170-180 days standard winter cereal cycle
    if (value < 170) {
      category = 'Early Season (< 170 d)';
      categoryColor = 'text-amber-800 bg-amber-100 border-amber-200';
    } else if (value <= 178) {
      category = 'Optimal Mid-Season (170 - 178 d)';
      categoryColor = 'text-emerald-800 bg-emerald-100 border-emerald-200';
    } else {
      category = 'Late Season (> 178 d)';
      categoryColor = 'text-sky-800 bg-sky-100 border-sky-200';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-28 flex items-center justify-center">
        <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
          <defs>
            {/* Agricultural AI green gradient */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="gaugeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#047857" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Value Arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#gaugeShadow)"
            className="transition-all duration-1000 ease-out"
          />

          {/* Needle Center Pin */}
          <circle cx={cx} cy={cy} r="6" fill="#0f172a" />
          <circle cx={cx} cy={cy} r="3" fill="#10b981" />

          {/* Pointer Needle */}
          <g
            transform={`rotate(${needleAngle} ${cx} ${cy})`}
            className="transition-transform duration-1000 ease-out"
          >
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - radius + 10}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Axis Labels */}
          <text x="18" y="108" fontSize="9" fill="#94a3b8" fontWeight="600" textAnchor="middle">
            {min}d
          </text>
          <text x="100" y="32" fontSize="9" fill="#94a3b8" fontWeight="600" textAnchor="middle">
            Mid
          </text>
          <text x="182" y="108" fontSize="9" fill="#94a3b8" fontWeight="600" textAnchor="middle">
            {max}d
          </text>
        </svg>
      </div>

      {/* Category Pill */}
      <div className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${categoryColor}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        <span>{category}</span>
      </div>
    </div>
  );
};
