/* eslint-disable @next/next/no-img-element */
'use client'

import { axiosClient } from "@/axiosSetup";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { MovieType } from "@/types/movies";

const Test = () => {
  return (<>
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title text-2xl font-bold">
          Featured Collections
        </h2>
        <a href="#" className="text-sm text-purple-400 hover:underline">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative rounded-xl overflow-hidden h-48">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"
            alt="Marvel Cinematic Universe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-xl font-bold">Marvel Cinematic Universe</h3>
            <p className="text-sm text-gray-300">23 movies • 4 series</p>
            <button className="watch-btn mt-3 px-4 py-2 rounded-full text-sm font-medium w-max">
              Explore
            </button>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden h-48">
          <img
            src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop"
            alt="Sci-Fi Masterpieces"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-xl font-bold">Sci-Fi Masterpieces</h3>
            <p className="text-sm text-gray-300">18 movies • 7 series</p>
            <button className="watch-btn mt-3 px-4 py-2 rounded-full text-sm font-medium w-max">
              Explore
            </button>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden h-48">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
            alt="Oscar Winners"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-xl font-bold">Oscar Winners</h3>
            <p className="text-sm text-gray-300">42 movies</p>
            <button className="watch-btn mt-3 px-4 py-2 rounded-full text-sm font-medium w-max">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>

  </>)
}


export default function ContentSection() {
  const { isPending, error, data } = useQuery<MovieType[]>({
    queryKey: ['movieContent'],
    queryFn: async () => {
      const res = await axiosClient.get<{ data: MovieType[] }>('/movies');
      console.log(res.data);
      return res.data.data;
    }
  });

  return (
    <>
      <div className="container mx-auto px-8 py-12">
        <Test />
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title text-2xl font-bold">New Releases</h2>
            <a href="#" className="text-sm text-purple-400 hover:underline">
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {isPending && <p>Loading</p>}
            {data && data.map((val) => (<MovieCard key={val.name} {...val} />))}
            {error && <p>{error.message}</p>}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title text-2xl font-bold">
              Popular Channels
            </h2>
            <a href="#" className="text-sm text-purple-400 hover:underline">
              View All
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-2 border-2 border-purple-500">
                <i className="fas fa-film text-purple-400 text-xl"></i>
              </div>
              <span className="text-sm text-center">CineClassics</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                <i className="fas fa-robot text-blue-400 text-xl"></i>
              </div>
              <span className="text-sm text-center">Sci-Fi Now</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                <i className="fas fa-laugh-squint text-yellow-400 text-xl"></i>
              </div>
              <span className="text-sm text-center">Comedy+</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                <i className="fas fa-dragon text-red-400 text-xl"></i>
              </div>
              <span className="text-sm text-center">Fantasy World</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
