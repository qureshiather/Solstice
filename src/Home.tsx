import { useNavigate } from "react-router-dom";
import ArtCarousel from "./components/ArtCarousel";
import Button from "@mui/material/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <h1 className="centerTitle glitch"> React P5 Art Generator </h1>

        <ArtCarousel />

        <h5 className="centerParagraph">
          Generate Art Pieces in your browser (with Math)
        </h5>
        <div id="FAQButton">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/generator")}
          >
            GENERATOR
          </Button>
        </div>
      </main>
    </>
  );
};

export default Home;
