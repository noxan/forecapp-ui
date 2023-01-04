# TODOs

Stick to essential model configurations.

- [x] Data explorer (high)
- [ ] Add help texts for people to understand feature better (high)
- [ ] Simplify energy dataset (high) -> remove other energy dataset variations
- [x] Exports for CSV (high)

- [x] Add configuration entry for lagged regressors

- [ ] Recruit new people for user interviews (high)

- [ ] Form validation for model configuration (medium)

- [ ] History of model scores (low priority)

## Bugfixes

- [x] Add cancel button during loading state
- [x] Get api working again and not time out after 30s
- [x] Add time information to x-axis
- [x] Fix 0 or empty values for integer fields (e.g. "training.epochs")
- [x] Remove unused code (after data explorer refactor)
- [x] Rename "y" and "yhat" to "actual" and "prediction" in plots
- [x] Unclear time horizon resolution / unit
- [x] Add labels to axis
- [x] Fix "yhat1" and "yhat2" if AR is enabled
- [ ] Chart history/future background should only update when prediction changes (not directly with forecasting horizon setting)
- [ ] Trend disabled does still show flat trend line in chart
- [ ] Add default or autodetected parameter ranges (e.g. epochs, learning rate, etc)
- [ ] "Reset axes" button on chart does nothing
- [ ] Remove plotly info button from chart
- [ ] Add units to axis (pretty impossible with the dataset)
- [ ] Add instructions for people on how to approach time series forecasting (start with trend, then seasonality, then AR, then regularization, etc)

## Improvements

- [ ] Unclear how to update forecasts
  - [ ] Pressing enter on input fields does nothing
  - [x] Make "Update forecasts" button more prominent
- [ ] Unclear to people if seasonality is enabled or not (if it does not automatically get detected)
- [ ] Unclear what is a good value for auto regression (also trend moves a lot once autoregression or regularization gets enabled)
- [ ] Unclear what epochs are? Add some help text / info icon
- [ ] Unclear what the metrics stand for (MAE, RMSE, Loss, RegLoss, etc)? Add some help text / info icon - add some judgement if it is a good or bad value
- [ ] Onboarding for the tool, see some examples and instructions how to interprete the results

## For beginners

- Test if people understand forecasting vocabulary, e.g. "regularization", "autoregression" - not a problem if experts get it, discussion: where is the line between expert and beginner? and how do such tools differ for experts and beginners? -> show help

## Further ideas

- Configuration wizard (skip for now)
- Explainable charts directly via python plot: https://stackoverflow.com/questions/72930513/how-to-plot-plotly-chart-on-react-from-json-response-from-flask-api


## Charly

- Besser leute direkt anschreiben für interviews
- Participatory design -> mit leuten zusammen das Design erarbeiten, da noch mal reinschauen? Das Paper entsprechend aufbauen, z.B. am Anfang hatten sich alle gefragt was z.B. "RMSE" heißt, dann haben wir tooltips eingebaut, Fragen hatten sich nicht mehr gestellt und verschoben nach XYZ
