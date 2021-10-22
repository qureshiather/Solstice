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
            The minting process for Solstice is very unique
            <ol>
              <li>
                10 minutes prior to minting, I will allow you to connect your
                wallet
              </li>
              <li>
                After connecting wallet, you can enter in a unique string and it
                will be reserved for you for 60 seconds
              </li>
              <li>
                Once exact mint time is reached, you will be allowed to mint
              </li>
              <li>
                Once minted, you will receive an SolsticeNFTPass and we will
                save your string
              </li>
              <li>
                After mint, your SolsticeNFT with the artwork will be generated
                based on entered in seed strings and airdropped to the wallets
                who have the corresponding SolsticeNFTPass
              </li>
            </ol>
            Unfortunately, generation is a slow process, I have to airdrop the minters
            in batch after minting is done. 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FAQModalButton;
