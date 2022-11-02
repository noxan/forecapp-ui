import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export default function Home() {
  const { data, error } = useSWR("/datasets/air_passengers.csv", fetcher);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  console.log(data, error);

  return <div>Hello world: {JSON.stringify(data)}</div>;
}
