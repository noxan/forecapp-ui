import { RJSFSchema } from "@rjsf/utils";

export const modelTrendConfigSchema: RJSFSchema = {
  title: "Model trend",
  type: "object",
  required: ["growth"],
  properties: {
    growth: { type: "string", enum: ["off", "linear"], default: "linear" },
    changepoints: {
      type: "array",
      items: { type: "string", format: "date-time" },
    },
    n_changepoints: { type: "integer", default: 10 },
    changepoints_range: { type: "number", default: 0.8 },
    trend_reg: { type: "number", default: 0 },
    trend_reg_threshold: { type: "boolean", default: false },
    trend_global_local: {
      type: "string",
      enum: ["global", "local"],
      default: "global",
    },
  },
};

export const modelTrainingConfigSchema: RJSFSchema = {
  title: "Training",
  type: "object",
  required: [],
  properties: {
    learning_rate: { type: "number" },
    epochs: { type: "integer" },
    batch_size: { type: "integer" },
    newer_samples_weight: { type: "number" },
    newer_samples_start: { type: "number" },
    loss_func: { type: "str | torch.nn.functional.loss" },
    collect_metrics: { type: "bool | [str]" },
    quantiles: { type: "array", items: { type: "number" } },
  },
};

export const modelLaggedRegressorConfigSchema = (
  columnHeaders: string[]
): RJSFSchema => ({
  type: "array",
  required: [],
  items: {
    type: "object",
    properties: {
      n_lags: { type: "string", default: "auto" },
      regularization: { type: "integer" },
      normalize: { type: "integer" },
      dataColumnRef: { type: "string", enum: columnHeaders },
    },
  },
});
