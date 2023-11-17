export type ResultText = {
  label: string;
  score: number;
};

export type Result = {
  text: ResultText[];
};

export type ResultWithValue = {
  value: Value;
  result: Result;
};

export type Value = {
  id: string;
  value: string;
};
