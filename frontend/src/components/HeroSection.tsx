export default function HeroSection(data: {
  title: string;
  src: string;
  description: string;
  logo: string;
}) {
  console.log(data.src);
  return (
    <>
      <section
        className={`h-[80vh] flex items-center px-12  bg-[url('/bcs_title.jpg')] bg-cover bg-center z-0

`}
      >
        <div className="absolute z-10 bg-black/50 w-full h-[80vh] inset-0"></div>
        <div className="max-w-2xl z-20">
          <div className="flex items-center mb-4">
            <span className="featured-badge text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </span>
            <span className="ml-2 text-sm text-purple-300">
              NEW EPISODE TODAY
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            The Midnight Detective
          </h1>
          <div className="flex items-center mb-4">
            <span className="bg-purple-900 bg-opacity-50 text-purple-300 text-xs px-2 py-1 rounded mr-3">
              4K UHD
            </span>
            <span className="text-sm mr-3">2023</span>
            <span className="text-sm mr-3">TV-MA</span>
            <span className="text-sm">3 Seasons</span>
          </div>
          <p className="text-lg mb-6 opacity-90">{data.description}</p>
          <div className="flex space-x-4">
            <button className="watch-btn px-8 py-3 rounded-full font-bold flex items-center">
              <i className="fas fa-play mr-2"></i> Watch Now
            </button>
            <button className="info-btn px-6 py-3 rounded-full font-bold flex items-center border border-gray-600">
              <i className="fas fa-info-circle mr-2"></i> More Info
            </button>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
