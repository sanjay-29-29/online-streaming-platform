import { MovieType } from "@/types/movies";

export default function Information(data: MovieType) {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-purple-300">{data.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span>{data.year}</span>
              <span className="border px-2 py-0.5 text-xs">{`${data.age_rating}`}+</span>
              <span>2h 15m</span>
            </div>

            <p className="text-gray-300 mb-6">
              {data.description}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Starring</h3>
              <p className="text-gray-300">
                {data.cast.map((val, idx) => <span key={val}>{val}{idx !== data.cast.length - 1 ? ', ' : ''}</span>)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {data.category.map((val) =>
                  <span className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm" key={val}>{val}</span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-4">


            <h3 className="text-lg font-semibold mb-2 text-purple-300">Details</h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="text-gray-400">Director:</span>
                <span className="ml-2">
                  {data.director.map((val, idx) => <span key={val}>{val}{idx !== data.director.length - 1 ? ', ' : ''}</span>)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Cast:</span>
                <span className="ml-2">
                  {data.cast.map((val, idx) => <span key={val}>{val}{idx !== data.cast.length - 1 ? ', ' : ''}</span>)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Genre:</span>
                <span className="ml-2">
                  {data.category.map((val, idx) => <span key={val}>{val}{idx !== data.category.length - 1 ? ', ' : ''}</span>)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Audio:</span>
                <span className="ml-2">
                  {data.audio.map((val, idx) => <span key={val}>{val}{idx !== data.audio.length - 1 ? ', ' : ''}</span>)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Subtitles:</span>
                <span className="ml-2">
                  {data.subtitles.map((val, idx) => <span key={val}>{val}{idx !== data.subtitles.length - 1 ? ', ' : ''}</span>)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
