import { number, z } from 'zod';
import { ModelState } from '../store/models';
import { extractValidationStatus } from './helpers';

export const forecasts = z
  .number()
  .gt(0, { message: 'Must be greater than 0' });
export const growth = z.enum(['off', 'linear']);
export const numberOfChangepoints = z
  .number({ invalid_type_error: 'Must be a number' })
  .int({ message: 'Must be an integer' })
  .gte(0, { message: 'Must be greater than or equal to 0' })
  .lte(20, { message: 'Must be less than or equal to 20' });
export const lags = z.number().gte(0, { message: 'Must be greater than 0' });
export const regularization = z.number();
export const earlyStopping = z.boolean();
export const epochs = z
  .number({ invalid_type_error: 'Must be a number' })
  .int({ message: 'Must be an integer' })
  .gt(0, { message: 'Must be greater than 0' })
  .nullable();
export const batchSize = z
  .number({ invalid_type_error: 'Must be a number' })
  .int({ message: 'Must be an integer' })
  .gt(0, { message: 'Must be greater than 0' })
  .nullable();
export const learningRate = z
  .number({ invalid_type_error: 'Must be a number' })
  .gt(0, { message: 'Must be greater than 0' })
  .nullable();
export const laggedRegressors = z.array(z.any());
export const holidays = z.array(z.string());
export const events = z.array(z.any());

export const trend = z
  .object({
    growth: growth,
    numberOfChangepoints: numberOfChangepoints
  })
  .or(
    z.object({
      growth: z.literal('off'),
      numberOfChangepoints: z.any()
    })
  );

export const ModelParameters = z.object({
  forecasts: forecasts.optional(),
  trend: trend,
  autoregression: z.object({
    lags: lags,
    regularization: z.number()
  }),
  seasonality: z.object({
    daily: z.any(),
    weekly: z.any(),
    yearly: z.any()
  }),
  training: z.object({
    earlyStopping: earlyStopping,
    epochs: epochs,
    batchSize: batchSize,
    learningRate: learningRate
  }),
  laggedRegressors: laggedRegressors,
  holidays: holidays,
  events: events
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
};

export const validateModelParameters = (modelParameters: ModelState) => {
  // define an object to store validation results
  const validationStatus: modelParameterValidationStatus = {
    forecasts: {
      valid: false,
      error: ''
    },
    trend: {
      numberOfChangepoints: {
        valid: false,
        error: ''
      }
    },
    autoregression: {
      lags: {
        valid: false,
        error: ''
      },
      regularization: {
        valid: false,
        error: ''
      }
    },
    training: {
      learningRate: {
        valid: false,
        error: ''
      },
      epochs: {
        valid: false,
        error: ''
      },
      batchSize: {
        valid: false,
        error: ''
      }
    }
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
  return validationStatus;
};
