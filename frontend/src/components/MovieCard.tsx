/* eslint-disable @next/next/no-img-element */
import { MovieType } from "@/types/movies";
import { useRouter } from "next/navigation";
import { JSX } from "react";

export default function MovieCard(movie: MovieType): JSX.Element {
  const router = useRouter();
  return (
    <>
      <div className="movie-card hover:scale-110 transition" onClick={() => router.push(`/watch/${movie._id}`)}>
        <div className="movie-card-inner">
          <img
            src={`data:${movie.image.cover.type};base64,${movie.image.cover.data}`}
            alt={movie.name}
            className="rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          </div>
          <div className="mt-3">
            <h3 className="font-bold">{movie.name}</h3>
            <p className="text-sm text-gray-400">{`${movie.year} • ${movie.category[movie.category.length - 1]}`}</p>
          </div>
        </div>
      </div>
    </>
  )
}
