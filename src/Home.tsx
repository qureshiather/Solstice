import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import ArtCarousel from "components/ArtCarousel";
import Footer from "components/Footer";
import { Button } from "components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-10 px-6 py-16">
      <div className="animate-fade-up space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Solstice
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Generative art from a seed
        </h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Procedural p5.js patterns — unique every time, driven by your seed
          string.
        </p>
      </div>

      <div className="animate-fade-up animate-delay-100 w-fit overflow-hidden rounded-xl border border-border/60 bg-card/50 shadow-lg backdrop-blur-sm">
        <ArtCarousel />
      </div>

      <Button
        size="lg"
        className="animate-fade-up animate-delay-200 h-11 px-8"
        onClick={() => navigate("/generator")}
      >
        <Sparkles className="h-4 w-4" />
        Open generator
      </Button>

      <div className="animate-fade-up animate-delay-300">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
