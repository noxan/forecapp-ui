export const datasetBaseUrl = "./datasets/";

const datasetExamples = [
  {
    title: "Energy (2018)",
    filename: "energy_dataset_2018.csv",
    description:
      "This dataset contains 1 year of electrical consumption, generation, pricing, and weather data for Spain in hourly resolution.",
    image: "photo-1508791290064-c27cc1ef7a9a",
  },
  {
    title: "Energy (full)",
    filename: "energy_dataset.csv",
    description:
      "This dataset contains 4 years of electrical consumption, generation, pricing, and weather data for Spain in hourly resolution.",
    image: "photo-1473341304170-971dccb5ac1e",
  },
  {
    title: "Online retail (5k)",
    filename: "online_retail_II_5k.csv",
    image: "photo-1563013544-824ae1b704d3",
  },
  {
    title: "Air passengers",
    filename: "air_passengers.csv",
    image: "photo-1569629743817-70d8db6c323b",
  },
  {
    title: "Energy (small)",
    filename: "energy_dataset_small.csv",
    description:
      "This dataset contains 1 month of electrical consumption, generation, pricing, and weather data for Spain in hourly resolution.",
    image: "photo-1473341304170-971dccb5ac1e",
  },
].map((dataset) => ({
  fullUrl: datasetBaseUrl + dataset.filename,
  ...dataset,
}));

export default datasetExamples;
