export interface Quote {
  id: number;
  text: string;
  author: string;
  book: string;
  rarity: string;
  category: QuoteCategory;
  interpretation: string;
}

export type QuoteCategory =
  | "wisdom"
  | "love"
  | "fate"
  | "action"
  | "courage"
  | "finance"
  | "life"
  | "happiness"
  | "freedom"
  | "graf";

export interface PredictionHistory {
  id: number;
  text: string;
  author: string;
  book: string;
  interpretation: string;
  date: string;
}

export type Screen = "welcome" | "loading" | "result";

export interface CategoryOption {
  id: QuoteCategory;
  label: string;
  icon: string;
}
