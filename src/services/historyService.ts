import { CropInput, PredictionResult, PredictionHistoryItem } from '../types';

const STORAGE_KEY = 'agridth_prediction_history_v2';

const INITIAL_SEEDED_HISTORY: PredictionHistoryItem[] = [
  {
    id: 'seed-1',
    cropName: 'Sample Crop A',
    taxa: 'EA_51',
    family: 'DHARWAR',
    location: 'Spillman',
    yieldVal: 2.21,
    height: 32.8,
    tstwt: 58.6,
    protein: 13.4,
    predictedDTH: 118,
    model: 'XGBoost',
    confidence: 'High',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'seed-2',
    cropName: 'Sample Crop B',
    taxa: 'EA_53',
    family: 'DHARWAR',
    location: 'Spillman',
    yieldVal: 2.41,
    height: 35.1,
    tstwt: 56.6,
    protein: 12.6,
    predictedDTH: 125,
    model: 'XGBoost',
    confidence: 'High',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'seed-3',
    cropName: 'Sample Crop C',
    taxa: 'EA_55',
    family: 'PBW343',
    location: 'Pullman',
    yieldVal: 2.85,
    height: 38.4,
    tstwt: 59.1,
    protein: 14.2,
    predictedDTH: 112,
    model: 'XGBoost',
    confidence: 'High',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const historyService = {
  getHistory(): PredictionHistoryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_HISTORY));
        return INITIAL_SEEDED_HISTORY;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Failed to read prediction history from localStorage:', err);
      return INITIAL_SEEDED_HISTORY;
    }
  },

  addPrediction(input: CropInput, result: PredictionResult): PredictionHistoryItem {
    const newItem: PredictionHistoryItem = {
      id: `pred-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      cropName: input.Name,
      taxa: input.Taxa,
      family: input.Family,
      location: input.Location,
      yieldVal: input.Yield,
      height: input.Height,
      tstwt: input.TSTWT,
      protein: input.Protein,
      predictedDTH: result.prediction,
      model: result.model,
      confidence: result.confidence || 'High',
      createdAt: new Date().toISOString()
    };

    try {
      const current = this.getHistory();
      const updated = [newItem, ...current].slice(0, 50); // keep last 50
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save prediction item to localStorage:', err);
    }

    return newItem;
  },

  deleteItem(id: string): PredictionHistoryItem[] {
    try {
      const current = this.getHistory();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('Failed to delete item from history:', err);
      return [];
    }
  },

  clearHistory(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (err) {
      console.error('Failed to clear prediction history:', err);
    }
  },

  exportCSV(): void {
    const history = this.getHistory();
    if (history.length === 0) return;

    const headers = ['ID', 'Crop Name', 'Taxa', 'Family', 'Location', 'Yield (t/ha)', 'Height (in)', 'TSTWT (lb/bu)', 'Protein (%)', 'Predicted DTH (Days)', 'Model', 'Confidence', 'Date'];
    const rows = history.map((item) => [
      item.id,
      `"${item.cropName}"`,
      `"${item.taxa}"`,
      `"${item.family}"`,
      `"${item.location}"`,
      item.yieldVal,
      item.height,
      item.tstwt,
      item.protein,
      item.predictedDTH,
      `"${item.model}"`,
      `"${item.confidence}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `agridth_predictions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
