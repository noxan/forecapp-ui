export const holidaysExplanation = (
  <>
    <p>
      <b>Holidays</b> are special days that are celebrated by a country or
      region. They are typically recurring and can be single or multiple days.
      This input allows you to include all the celebrated holidays of one or
      multiple countries.
    </p>
  </>
);

export const holidaysDocumentationLink =
  "https://neuralprophet.com/tutorials/tutorial07.html";

export const eventsExplanation = (
  <>
    <p>
      <b>Events</b> are any recurring special time ranges that might occur in a
      time series. They can be from a few seconds up to months depending on the
      time unit and duration of your dataset.
    </p>
  </>
);

export const autoRegressionExplanation = (
  <>
    <p>
      <b>Autoregression</b> uses previous values of a time-series to predict the
      value of the next time point. It is based on the assumption that the past
      values of a time-series are related to the future values in a linear way.
      The optimal value for an autoregressive model is determined by the
      complexity of the relationship between the past and future values in the
      time-series data. A larger value may capture more of this complexity, but
      it may also increase the risk of overfitting, where the model fits the
      training data too closely and may not generalize well to new data. On the
      other hand, a smaller value may not capture enough complexity and may
      result in a model with lower accuracy.
    </p>
  </>
);

export const laggedRegressorsExplanation = (
  <>
    <p>
      <b>Lagged regressors </b>
      allow you to include additional measured quantities for generating the
      time series forecast. Let's say you want to predict the daily sales of an
      icecream shop. In addition to providing the model with the past sales of
      that ice cream place, it might be useful to provide it with the weather
      data for a given day. This way, the model can learn that on hot days, more
      ice cream is sold. The lagged regressors allow you to provide the model
      with this additional information. You can select any number of columns
      from the dataset as lagged regressors. The model will then use the values
      of these columns at the same time point as the target column to predict
      the target column. For example, if you select the column 'temperature' as
      a lagged regressor, the model will use the temperature at the same time
      point as the target column to predict the target column.
    </p>
  </>
);

export const laggedRegressorsDocumnentationLink =
  "https://neuralprophet.com/tutorials/tutorial05.html";

export const autoRegressionDocumentationLink =
  "https://neuralprophet.com/tutorials/tutorial04.html";

export const trendExplanation = (
  <>
    <p>
      <b>Trend change points</b>, also known as inflection points, are points in
      a data series where the direction of the trend changes. For example,if a
      data series is trending upwards and then begins to trend downwards, the
      point where the upward trend ends and the downward trend begins is a trend
      change point.
    </p>
  </>
);

export const seasonalityExplanation = (
  <>
    <p>
      <b>Seasonality</b> is a characteristic of a time series in which the data
      experiences regular and predictable changes that recur periodically. Any
      predictable change or pattern in a time series that recurs or repeats over
      a period can be said to be seasonal. Seasonality refers to periodic
      fluctuations. For example, electricity consumption is high during the day
      and low during night, or online sales increase during Christmas before
      decreasing again. Seasonality is always of a fixed and known frequency.
      When selecting a daily, weekly, or monthly seasonality, the model will
      look for a recurring pattern in the data with the given time scale.
    </p>
  </>
);

export const trendDocumentationLink =
  "https://neuralprophet.com/tutorials/tutorial02.html";

export const seasonalityDocumentationLink =
  "https://neuralprophet.com/tutorials/tutorial03.html";

export const epochsExplanation = (
  <>
    <p>
      <b>Epochs</b> are the number of times the model will go through the entire
      training dataset. When early stopping is enabled, the model will stop as
      soon as the improvement in model performance plateaus.
    </p>
  </>
);

export const learningRateExplanation = (
  <>
    <p>
      <b>Learning rate</b> is a hyperparameter that controls how much to change
      the model in response to the estimated error each time the model weights
      are updated.
    </p>
  </>
);

export const batchSizesExplanation = (
  <>
    <p>
      <b>Batch size</b> is a hyperparameter that defines the number of samples
      to input into the model before the model parameters are updated.
    </p>
  </>
);

export const trainTestSplitExplanation = (
  <>
    <p>
      <b>Train test split</b> is a method for evaluating the performance of a
      machine learning algorithm. It splits the dataset into two parts: a
      training set and a test set. The training set is used to train the model,
      while the test set is used to evaluate the model's performance. The
      training set is typically larger than the test set.
    </p>
  </>
);

export const trainTestSplitDocumentationLink =
  "https://neuralprophet.com/tutorials/tutorial10.html";

export const quantilesExplanation = (
  <>
    <p>
      <b>Quantiles</b> are percentage bins for how likely the true result is to
      be in a certain range. Standard quantiles are 68%, 95%, and 99.7%. The
      intervals are always symmetric, and centered around the median of the
      distribution.
    </p>
  </>
);

export const quantilesDocumentationLink =
  "https://neuralprophet.com/tutorials/tutorial08.html";
