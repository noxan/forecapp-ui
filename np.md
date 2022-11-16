# Neural Prophet

yˆt =T(t)+S(t)+E(t)+F(t)+A(t)+L(t)

## Trend

T(t) = Trend at time t

growth = off | linear
changepoints = [datetimes]
n_changepoints = int
changepoints_range = float
trend_reg = float
trend_reg_threshold = bool
trend_global_local = global | local

## Seasonality

S(t) = Seasonal effects at time t

yearly_seasonality = bool | auto | int
weekly_seasonality = bool | auto | int
daily_seasonality = bool | auto | int
seasonality_mode = additive | multiplicative
seasonality_reg = float
season_global_local = global | local

## Auto regression

A(t) = Auto-regression effects at time t based on past observations

n_lags = int
ar_reg = float

n_forecasts = int
num_hidden_layers = int (default = 0)
d_hidden = int

## Events and holidays

E(t) = Event and holiday effects at time t

## Future regresors

F(t) = Regression effects at time t for future-known exogenous variables

## Lagged regressors

L(t) = Regression effects at time t for lagged observations of exogenous variables

## Training

learning_rate = float
epochs = int
batch_size = int
newer_samples_weight = float
newer_samples_start = float
loss_func = str | torch.nn.functional.loss
collect_metrics = bool | [str]
quantiles = [float]

## Data preparation

impute_missing = bool
impute_linear = int
impute_rolling = int
drop_missing = bool

normalize = str
global_normalization = bool
global_time_normalization = bool
unknown_data_normalization = bool

## Validation
