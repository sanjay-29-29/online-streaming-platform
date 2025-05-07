import HeroSection from "@/components/HeroSection";
import { titleData } from "./data";
import NavBar from "@/components/NavBar";
import ContentSection from "@/components/Content";
import Footer from "@/components/FooterSection";

export default async function BrowsePage() {
  return (
    <>
      <NavBar />
      <HeroSection {...titleData} />
      <ContentSection />
      <Footer />
    </>
  );
}
