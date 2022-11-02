import useSWR from "swr";
import { parse as parseCSV } from "csv-parse/sync";
import Table from "../components/Table";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export default function Home() {
  const response = useSWR("/datasets/air_passengers.csv", fetcher);

  if (response.error || !response.data) {
    return <div>Error: {JSON.stringify(response.error)}</div>;
  }

  const records = parseCSV(response.data);

  return (
    <div>
      <Table initialData={records} />
    </div>
  );
}
