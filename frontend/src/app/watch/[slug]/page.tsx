"use client";

import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/FooterSection";

import './player.css'
import VideoPlayer from "./Player";
import Information from "./Information";
import { axiosClient } from "@/axiosSetup";
import { useQuery } from "@tanstack/react-query";
import { MovieType } from "@/types/movies";


function Player() {
  const params = useParams();
  const slug = params.slug;

  const { isPending, error, data } = useQuery<MovieType>({
    queryKey: ['sample', slug],
    queryFn: async () => {
      const res = await axiosClient.get<{ data: MovieType }>(`/movies/${slug}`);
      return res.data.data;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading movie.</div>;

  return (
    <>
      <NavBar />
      <VideoPlayer {...data} />
      <Information {...data} />
      <Footer />
    </>
  );
}


export default Player;
