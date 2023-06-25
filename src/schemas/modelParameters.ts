import { z } from "zod";
import { ModelState } from "../store/models";
import { extractValidationStatus } from "./helpers";
import { modelConfigurationMenu } from "../../pages/model-configuration";

export const forecasts = z
  .number({ invalid_type_error: "Must be a number" })
  .gt(0, { message: "Must be greater than 0" });
export const growth = z.enum(["off", "linear"]);
export const numberOfChangepoints = z
  .number({ invalid_type_error: "Must be a number" })
  .int({ message: "Must be an integer" })
  .gte(0, { message: "Must be greater than or equal to 0" })
  .lte(20, { message: "Must be less than or equal to 20" });
export const lags = z
  .number({ invalid_type_error: "Must be a number" })
  .int({ message: "Must be an integer" })
  .gte(0, { message: "Must be greater than 0" });
export const regularization = z.number({
  invalid_type_error: "Must be a number",
});
export const eventNameSchema = z
  .string({ invalid_type_error: "Must be a string" })
  .nonempty({ message: "Event name cannot be empty" });
export const eventDatesSchema = z
  .array(z.string(), { invalid_type_error: "Must be an array of strings" })
  .nonempty({ message: "Event dates cannot be empty" });
export const eventRegularization = z
  .number({ invalid_type_error: "Must be a number" })
  .gte(0, { message: "Must be greater than or equal to 0" })
  .lte(1, { message: "Must be less that or equal to 1" });
export const eventLowerWindow = z
  .number({ invalid_type_error: "Must be a number" })
  .int({ message: "Must be an integer" })
  .lte(0, { message: "Must be less than or equal to 0" });
export const eventUpperWindow = z
  .number({ invalid_type_error: "Must be a number" })
  .int({ message: "Must be an integer" })
  .gte(0, { message: "Must be greater than or equal to 0" });
export const eventMode = z.enum(["additive", "multiplicative"]);
export const earlyStopping = z.boolean({
  invalid_type_error: "Must be a boolean",
});
export const epochs = z
  .number({ invalid_type_error: "Must be a number" })
  .int({ message: "Must be an integer" })
  .gt(0, { message: "Must be greater than 0" })
  .nullable();
export const batchSize = z
  .number({ invalid_type_error: "Must be a number" })
  .int({ message: "Must be an integer" })
  .gt(0, { message: "Must be greater than 0" })
  .nullable();
export const learningRate = z
  .number({ invalid_type_error: "Must be a number" })
  .gt(0, { message: "Must be greater than 0" })
  .nullable();
export const testSplit = z
  .number({ invalid_type_error: "Must be a number" })
  .gte(0, { message: "Must be greater than or equal to 0" })
  .lte(100, { message: "Must be less than or equal to 100" });
export const confidenceLevel = z
  .number({ invalid_type_error: "Must be a number" })
  .gte(0, { message: "Must be greater than or equal to 0" })
  .lt(100, { message: "Must be less than 100" });
export const laggedRegressors = z.array(z.any());
export const holidays = z.array(z.string());
export const events = z.array(z.any());

export const trend = z
  .object({
    growth: z.literal("linear"),
    numberOfChangepoints: numberOfChangepoints,
  })
  .or(
    z.object({
      growth: z.literal("off"),
      numberOfChangepoints: z.any(),
    })
  );

export const ModelParameters = z.object({
  forecasts: forecasts.optional(),
  trend: trend,
  autoregression: z.object({
    lags: lags,
    regularization: z.number(),
  }),
  seasonality: z.object({
    daily: z.any(),
    weekly: z.any(),
    yearly: z.any(),
  }),
  events: z.record(
    eventNameSchema,
    z.object({
      dates: eventDatesSchema,
      regularization: eventRegularization,
      lowerWindow: eventLowerWindow,
      upperWindow: eventUpperWindow,
      mode: eventMode,
    })
  ),
  training: z.object({
    earlyStopping: earlyStopping,
    epochs: epochs,
    batchSize: batchSize,
    learningRate: learningRate,
  }),
  validation: z.object({
    testSplit: testSplit,
    confidenceLevel: confidenceLevel,
  }),
  laggedRegressors: laggedRegressors,
  holidays: holidays,
});

export type modelParameterValidationStatus = {
  forecasts: {
    valid: boolean;
    error: string;
  };
  trend: {
    numberOfChangepoints: {
      valid: boolean;
      error: string;
    };
  };
  autoregression: {
    lags: {
      valid: boolean;
      error: string;
    };
    regularization: {
      valid: boolean;
      error: string;
    };
  };
  training: {
    learningRate: {
      valid: boolean;
      error: string;
    };
    epochs: {
      valid: boolean;
      error: string;
    };
    batchSize: {
      valid: boolean;
      error: string;
    };
  };
  validation: {
    testSplit: {
      valid: boolean;
      error: string;
    };
    confidenceLevel: {
      valid: boolean;
      error: string;
    };
  };
};

export const validateModelParameterSection = (
  modelParameters: ModelState,
  parameterSection: modelConfigurationMenu
) => {
  // this function validates the model parameters for a given section
  const validationStatus: modelParameterValidationStatus = {
    forecasts: {
      valid: false,
      error: "",
    },
    trend: {
      numberOfChangepoints: {
        valid: false,
        error: "",
      },
    },
    autoregression: {
      lags: {
        valid: false,
        error: "",
      },
      regularization: {
        valid: false,
        error: "",
      },
    },
    training: {
      learningRate: {
        valid: false,
        error: "",
      },
      epochs: {
        valid: false,
        error: "",
      },
      batchSize: {
        valid: false,
        error: "",
      },
    },
    validation: {
      testSplit: {
        valid: false,
        error: "",
      },
      confidenceLevel: {
        valid: false,
        error: "",
      },
    },
  };
  switch (parameterSection) {
    case "underlying-trends":
      validationStatus.trend.numberOfChangepoints = extractValidationStatus(
        numberOfChangepoints.safeParse(
          modelParameters.trend.numberOfChangepoints
        )
      );
      break;
    case "training-configuration":
      validationStatus.training.epochs = extractValidationStatus(
        epochs.safeParse(modelParameters.training.epochs)
      );
      validationStatus.training.learningRate = extractValidationStatus(
        learningRate.safeParse(modelParameters.training.learningRate)
      );
      validationStatus.training.batchSize = extractValidationStatus(
        batchSize.safeParse(modelParameters.training.batchSize)
      );
      break;
    case "validation-configuration":
      validationStatus.validation.testSplit = extractValidationStatus(
        testSplit.safeParse(modelParameters.validation.testSplit)
      );
      validationStatus.validation.confidenceLevel = extractValidationStatus(
        confidenceLevel.safeParse(modelParameters.validation.confidenceLevel)
      );
      break;
    case "prediction-configuration":
      validationStatus.forecasts = extractValidationStatus(
        forecasts.safeParse(modelParameters.forecasts)
      );
      break;
    case "modeling-assumptions":
      validationStatus.autoregression.lags = extractValidationStatus(
        lags.safeParse(modelParameters.autoregression.lags)
      );
      validationStatus.autoregression.regularization = extractValidationStatus(
        regularization.safeParse(modelParameters.autoregression.regularization)
      );
      break;
    default:
      break;
  }
  return validationStatus;
};

export const validateModelParameters = (modelParameters: ModelState) => {
  // define an object to store validation results
  const validationStatus: modelParameterValidationStatus = {
    forecasts: {
      valid: false,
      error: "",
    },
    trend: {
      numberOfChangepoints: {
        valid: false,
        error: "",
      },
    },
    autoregression: {
      lags: {
        valid: false,
        error: "",
      },
      regularization: {
        valid: false,
        error: "",
      },
    },
    training: {
      learningRate: {
        valid: false,
        error: "",
      },
      epochs: {
        valid: false,
        error: "",
      },
      batchSize: {
        valid: false,
        error: "",
      },
    },
    validation: {
      testSplit: {
        valid: false,
        error: "",
      },
      confidenceLevel: {
        valid: false,
        error: "",
      },
    },
  };
  // validate model parameters using zod schema
  validationStatus.forecasts = extractValidationStatus(
    forecasts.safeParse(modelParameters.forecasts)
  );
  validationStatus.trend.numberOfChangepoints = extractValidationStatus(
    numberOfChangepoints.safeParse(modelParameters.trend.numberOfChangepoints)
  );
  validationStatus.autoregression.lags = extractValidationStatus(
    lags.safeParse(modelParameters.autoregression.lags)
  );
  validationStatus.autoregression.regularization = extractValidationStatus(
    regularization.safeParse(modelParameters.autoregression.regularization)
  );
  validationStatus.training.epochs = extractValidationStatus(
    epochs.safeParse(modelParameters.training.epochs)
  );
  validationStatus.training.batchSize = extractValidationStatus(
    batchSize.safeParse(modelParameters.training.batchSize)
  );
  validationStatus.training.learningRate = extractValidationStatus(
    learningRate.safeParse(modelParameters.training.learningRate)
  );
  validationStatus.validation.testSplit = extractValidationStatus(
    testSplit.safeParse(modelParameters.validation.testSplit)
  );
  validationStatus.validation.confidenceLevel = extractValidationStatus(
    confidenceLevel.safeParse(modelParameters.validation.confidenceLevel)
  );
  return validationStatus;
};
