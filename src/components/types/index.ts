export interface Quote {
  id: number;
  text: string;
  author: string;
  book: string;
  category: "wisdom" | "love" | "fate" | "action" | "courage";
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
