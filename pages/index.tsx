import useSWR from "swr";
import { parse as parseCSV } from "csv-parse/sync";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export default function Home() {
  const { data, error } = useSWR("/datasets/air_passengers.csv", fetcher);

  if (error || !data) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const records = parseCSV(data);

  console.log(records, error);

  return <div>Hello world: {JSON.stringify(records)}</div>;
}
