import { RJSFSchema } from "@rjsf/utils";

export const modelConfigSchema: RJSFSchema = {
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
