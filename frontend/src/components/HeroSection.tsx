export default function HeroSection(data: {
  title: string;
  src: string;
  description: string;
}) {
  return (
    <>
      <section className="relative h-[85vh]">
        <img src={data.src} className="object-cover w-full h-full" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="absolute sm:bottom-1/6 bottom-8 px-16 flex flex-col z-20">
          <div className="sm:text-8xl text-5xl mb-2">{data.title}</div>
          <div className="font-thin max-w-sm ml-2 sm:text-md mb-5">
            {data.description}
          </div>
          <div className="ml-2">
            <button className="p-2 bg-white text-black rounded-lg hover:bg-white/90 font-bold">
              Watch Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
