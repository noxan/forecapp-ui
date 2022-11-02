import useSWR from "swr";
import { parse as parseCSV } from "csv-parse/sync";
import Table from "../components/Table";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

export default function Home() {
  const response = useSWR("/datasets/air_passengers.csv", fetcher);

  if (response.error || !response.data) {
    return <div>Error: {JSON.stringify(response.error)}</div>;
  }

  const records = parseCSV(response.data);

  return (
    <div>
      <Table defaultData={defaultData} />
    </div>
  );
}
