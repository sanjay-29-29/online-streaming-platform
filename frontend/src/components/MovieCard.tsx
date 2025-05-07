/* eslint-disable @next/next/no-img-element */
import { MovieType } from "@/types/movies";
import { useRouter } from "next/navigation";
import { JSX } from "react";

export default function MovieCard(movie: MovieType): JSX.Element {
  const router = useRouter();
  return (
    <div
      className="movie-card hover:scale-110 transition cursor-pointer"
      onClick={() => router.push(`/watch/${movie._id}`)}
    >
      <div className="movie-card-inner relative w-full">
        <div className="w-full aspect-[2/3] overflow-hidden rounded-md">
          <img
            src={`data:${movie.image.poster.type};base64,${movie.image.poster.data}`}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-3">
          <h3 className="font-bold">{movie.name}</h3>
          <p className="text-sm text-gray-400">
            {`${movie.year} • ${movie.category[movie.category.length - 1]}`}
          </p>
        </div>
      </div>
    </div>
  );
}

