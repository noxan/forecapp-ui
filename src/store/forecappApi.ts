import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    readRootGet: build.query<ReadRootGetApiResponse, ReadRootGetApiArg>({
      query: () => ({ url: `/` }),
    }),
    predictionPredictionPost: build.mutation<
      PredictionPredictionPostApiResponse,
      PredictionPredictionPostApiArg
    >({
      query: (queryArg) => ({
        url: `/prediction`,
        method: "POST",
        body: queryArg.bodyPredictionPredictionPost,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as forecappApi };
export type ReadRootGetApiResponse = /** status 200 Successful Response */ any;
export type ReadRootGetApiArg = void;
export type PredictionPredictionPostApiResponse =
  /** status 200 Successful Response */ any;
export type PredictionPredictionPostApiArg = {
  bodyPredictionPredictionPost: BodyPredictionPredictionPost;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type DatasetItem = {
  ds: string | number;
  y: string | number | number;
};
export type Dataset = DatasetItem[];
export type AutoregressionConfig = {
  lags?: number;
  regularization?: number;
};
export type SeasonalityConfig = {
  yearly?: "auto" | boolean | number;
  weekly?: "auto" | boolean | number;
  daily?: "auto" | boolean | number;
  mode?: "additive" | "multiplicative";
  regularization?: number;
};
export type TrainingConfig = {
  epochs?: number;
  learningRate?: number;
  batchSize?: number;
  earlyStopping?: boolean;
};
export type ModelConfig = {
  forecasts?: number;
  frequency?: string;
  autoregression?: AutoregressionConfig;
  seasonality?: SeasonalityConfig;
  training?: TrainingConfig;
};
export type BodyPredictionPredictionPost = {
  dataset: Dataset;
  configuration: ModelConfig;
};
export const { useReadRootGetQuery, usePredictionPredictionPostMutation } =
  injectedRtkApi;
