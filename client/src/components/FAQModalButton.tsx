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
  width: 350,
  border: "2px solid #999",
  boxShadow: 24,
  p: 4,
};

export const FAQModalButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="FAQButton">
      <Button onClick={handleOpen}>How minting works</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="transparentBlackBackground">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How Solstice NFT will Mint
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <br />
            Minting Process:
            <ol>
              <li>Connect your wallet on the home page </li>
              <li>Make sure you have enough funds and hit Mint</li>
              <li>Once you have received your ticket, go to the generator </li>
              <li>Connect your wallet on the generator page (it will count your tickets)</li>
              <li>
                Once you are satisfied, you can submit a design, and it
                will then kick off the process to update one of your tickets metadata with your design (will take a few min)
              </li>
            </ol>
            <ul>
              <li>
                Once you submit, you seed phrase will persist and can never be duplicated.
              </li>
              <li>
                You can force refresh to disconnect your wallet and connect another one
              </li>
              <li>
                If there are any issues, contact me on twitter at https://twitter.com/NftSolstice, I can do everything manually!
              </li>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FAQModalButton;
