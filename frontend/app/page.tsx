import Hero from "./components/home/Hero";
import FeaturedGames from "./components/home/FeaturedGames";
import Features from "./components/home/Features";
import CTA from "./components/home/CTA";
import LiveWins from "./components/home/LiveWins";
import Stats from "./components/home/Stats";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <LiveWins />
      <Stats />
      <FeaturedGames />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
