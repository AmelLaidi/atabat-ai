export interface NovelAnalysis {
  title: string;
  author: string;
  summary: string;
  themes: { name: string; weight: number }[];
  characters: { name: string; description: string; traits: string[] }[];
  emotions: { sentiment: string; score: number; color: string }[];
  atmosphere: string;
  symbols: { concept: string; symbol: string; description: string }[];
  narrativeStructure: {
    conflict: string;
    climax: string;
    resolution: string;
  };
}

export interface VisualIdentity {
  colorPalette: string[];
  typography: {
    primary: string;
    secondary: string;
  };
  symbols: { icon: string; label: string }[];
  coverPrompt: string;
  coverImage?: string;
}

export type AppState = 'upload' | 'analyzing' | 'dashboard' | 'identity';
