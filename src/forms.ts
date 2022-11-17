import { RJSFSchema } from "@rjsf/utils";

export const modelConfigSchema: RJSFSchema = {
  title: "Model trend",
  type: "object",
  required: ["title"],
  properties: {
    growth: { type: "string", enum: ["off", "linear"] },
    changepoints: {
      type: "array",
      items: { type: "string", format: "date-time" },
    },
    n_changepoints: { type: "integer" },
    changepoints_range: { type: "number" },
    trend_reg: { type: "number" },
    trend_reg_threshold: { type: "boolean" },
    trend_global_local: { type: "string", enum: ["global", "local"] },
  },
};
