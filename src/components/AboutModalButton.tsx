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
            About
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            The entered in string value will be used in my handcrafted algorithm
            to generate a unique image
            <ul>
              <li>
                {" "}
                There are virtually unlimited combinations of particle patterns,
                colors, shapes..{" "}
              </li>
              <li>
                {" "}
                Each image will be unique and there will only be 8888 of them{" "}
              </li>
              <li>Airdrop will contain 4k version of your seed art</li>
              <li>
                The MINT# and seed value will be visible on the top left of the
                image
              </li>
              <li>
                Minters will receive half the royalties from every subsequent
                sale of the art
              </li>
              <li>
                {" "}
                A month after launch, all generation code will be deleted and
                never used again{" "}
              </li>
            </ul>
            This entire project was made with love by a single dev who hates his
            job and wants to pursue his creative interests full-time
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutModalButton;
