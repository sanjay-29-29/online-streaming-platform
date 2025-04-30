import HeroSection from "@/components/HeroSection";
import { data, titleData } from "./data";

export default function BrowsePage() {
  return (
    <>
      <HeroSection {...titleData} />
      <div className="ml-4 flex flex-col relative sm:bottom-16">
        <div className="sm:text-5xl text-3xl font-bold sm:mx-6 z-40">
          Watch Now
        </div>
        <div className="flex space-x-4 px-2 sm:py-4 overflow-x-auto overflow-y-hidden">
          {data.movies.map((ele) => (
            <div
              key={ele.title}
              className="hover:scale-110 transition-transform duration-300 m-4 flex-shrink-0"
            >
              <img
                src={ele.poster}
                className="rounded-lg object-fit sm:w-96 w-52"
                alt={ele.title}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
