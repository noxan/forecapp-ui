/*
  Error Types
*/

// Represents an error in connecting the backend
export type HTTPError = {
  message: string;
  name: string;
  stack: string;
};

export type NeuralProphetError = {
  detail: string;
};

export type ValidationError = {
  detail: {
    ctx: { limit_value: number };
    loc: string[];
    msg: string;
    type: string;
  }[];
};

export type APIError = HTTPError | NeuralProphetError | ValidationError;
