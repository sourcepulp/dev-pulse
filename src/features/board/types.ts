export type ResultText = {
  label: string;
  score: number;
};

export type Result = {
  text: ResultText[];
  id: string;
};

export type ResultWithValue = {
  value: string;
  result: Result;
};
