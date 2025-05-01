export default function HeroSection(data: {
  title: string;
  src: string;
  description: string;
  logo: string;
}) {
  return (
    <>
      <section className="relative h-[85vh]">
        <div className="absolute top-0 flex flex-row mx-4">
          <div className="text-red-800 font-bold mr-2">NETFLIX</div>
          <div className="space-x-2 flex flex-row">
            <div className="">Home</div>
            <div className="">About</div>
            <div className="">TV Shows</div>
            <div className="">Games</div>
          </div>
        </div>
        <img
          src={data.src}
          className="object-cover w-full h-full"
          alt={data.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="absolute bottom-1/4 ml-10 z-50 flex h-full flex-col-reverse">
          <div className="w-full my-2 font-bold max-w-1/2">{data.description}</div>
          <img className="w-full my-2" src={data.logo} alt={data.title} />
        </div>
      </section>
    </>
  );
}
