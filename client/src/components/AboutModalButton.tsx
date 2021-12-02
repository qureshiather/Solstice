import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #999",
  boxShadow: 24,
  p: 4,
};

export const AboutModalButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="FAQButton">
      <Button onClick={handleOpen}>About</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="transparentBlackBackground">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About Solstice
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            The artwork samples here are all uniquely generated based on your seed phrase!
            <ul>
              <li>
                {" "}
                Each image will verified to be unique and there will only be 999 of them{" "}
              </li>
              <li>The final NFT will link to a 1440 pixel version of your design</li>
            </ul>
            This entire project was made with love by a single dev who hates his
            job and wants to pursue his creative interests full-time
            <br /> <br />
            Join the discord, talk generative art be it audio or visuals, smart
            contracts, NFT tools etc.
            <br />
            We are the builders!!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutModalButton;
