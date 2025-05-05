"use client";
import HeroSection from "@/components/HeroSection";
import { titleData } from "./data";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/axiosSetup";
import { Movie } from "@/types/movies";
import Link from "next/link";

export default function BrowsePage() {
  const { data, error, isLoading } = useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await axiosClient.get<Movie[]>("/movies");
      return response.data!.data;
    },
  });

  return (
    <>
      <HeroSection {...titleData} />
      <div className="ml-4 flex flex-col relative sm:bottom-16">
        {error && <p>Erro</p>}
        {isLoading && <p>Loading</p>}
        {data && (
          <>
            <div className="sm:text-3xl text-2xl font-bold sm:mx-6 z-40">
              Critically Acclaimed TV Shows
            </div>
            <div className="flex space-x-4 px-2 sm:py-4 overflow-x-auto overflow-y-hidden">
              {data.map((ele) => (
                <Link
                  href={`/play/${ele._id}`}
                  key={ele.name}
                  className=" transition-transform duration-300 m-4 flex-shrink-0"
                >
                  <img
                    src={`data:${ele.images.poster.type};base64,${ele.images.poster.data}`}
                    className="rounded-lg object-fit sm:w-72"
                    alt={ele.name}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
