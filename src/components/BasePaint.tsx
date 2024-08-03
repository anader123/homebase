"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function BasePaint() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchBasePaints"],
    queryFn: () => apiFetcher("basepaint"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <main className="flex flex-col items-center justify-between">
      <h1>BasePaint Day #{data.tokenId}</h1>
      <Image src={`${data.image}`} alt={data.name} width={500} height={300} />
    </main>
  );
}
