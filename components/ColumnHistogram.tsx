import { CChartBar } from "@coreui/react-chartjs";

const ColumnHistogram = ({
  rows,
  chartColor,
}: {
  rows: any[];
  chartColor: string;
}) => {
  // TODO: create bins if data type allows
  const counts: { [x: string]: any } = {};

  rows.forEach((row) => (counts[row] = counts[row] ? counts[row] + 1 : 1));
  const keys = Object.keys(counts).sort();

  return (
    <CChartBar
      type="bar"
      data={{
        labels: keys,
        datasets: [
          {
            label: "Value distribution",
            data: keys.map((key: any) => counts[key]),
            backgroundColor: chartColor + "30",
            borderColor: chartColor + "90",
          },
        ],
      }}
    />
  );
};

export default ColumnHistogram;
