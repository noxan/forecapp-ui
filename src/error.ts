// Typing for an error in connecting to the server
export type HTTPError = {
  message: string;
  name: string;
  stack: string;
};

// Typing for the response sent by the server when NeuralProphet has an error
export type NeuralProphetError = {
  detail: string;
};

// Typing for FastAPI not being able to convert the POSTed data into a valid configuration
export type ValidationError = {
  detail: {
    ctx: { limit_value: number };
    loc: string[];
    msg: string;
    type: string;
  }[];
};

export type APIError = HTTPError | NeuralProphetError | ValidationError;
