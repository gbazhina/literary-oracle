export type TCategory = "wisdom" | "love" | "fate" | "action" | "courage";
export interface Quote {
  id: number;
  text: string;
  author: string;
  book: string;
  category: string;
  interpretation: string;
}

export interface PredictionHistory {
  id: number;
  text: string;
  author: string;
  book: string;
  interpretation: string;
  date: string;
}

export type Screen = "welcome" | "loading" | "result";
