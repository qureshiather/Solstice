import { useNavigate } from "react-router-dom";
import ArtCarousel from "./components/ArtCarousel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BoltIcon from "@mui/icons-material/Bolt";
import Footer from "./components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={4} alignItems="center">
            <h1 style={{ marginBottom: "32px", marginTop: "32px" }}>
              P5.js Generator
            </h1>
            <ArtCarousel />
            <p>Generate Art Pieces in your browser</p>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/generator")}
              startIcon={<BoltIcon />}
            >
              Generator
            </Button>
            <Footer />
          </Stack>
        </Box>
      </main>
    </>
  );
};

export default Home;
