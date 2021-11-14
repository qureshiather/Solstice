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
              <li>1. Mint a SolsticeTicket on the home page</li>
              <li>2. Go to the generator</li>
              <li>
                3. Connect your wallet, and if you have a unsued SolsticeTicket,
                you can experiment with different generations
              </li>
              <li>
                4. Once you are satisfied, you can submit your ticket, and it
                will then kick off the process to update your ticket with a 4k
                version of your art + metadata.
              </li>
            </ol>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FAQModalButton;
