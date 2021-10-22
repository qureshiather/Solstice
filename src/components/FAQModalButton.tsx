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
  width: 500,
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
            The minting process for Solstice is very unique! Youtube video
            coming soon!
            <br />
            <br />
            Minting Process:
            <ol>
              <li>
                10 minutes prior to minting, I will allow you to connect your
                wallet
              </li>
              <li>
                After connecting wallet, you can enter in a unique string and it
                will be reserved for you for 60 seconds
                <ul>
                  <li>
                    You can re-reserve your unique string to extend your
                    reservation of that string.
                  </li>
                  <li>
                    If someone else has your string, you will prompted to choose
                    another
                  </li>
                </ul>
              </li>
              <li>
                Once exact mint time is reached, you will be allowed to mint
                provided you have a reserved unique string and enough funds
              </li>
              <li>
                Once minted, you will IMMEDIATELY receive a SolsticeNFTPass and
                we will save your unique string
              </li>
              <li>
                Shortly after mint, your artwork will be generated based on your
                unique string and an NFT containing it will be airdropped to the
                wallets who have the corresponding SolsticeNFTPass
              </li>
            </ol>
            Unfortunately, 4k art generation, signing each image with seed +
            number, uploading the image to arweave, and creating a NFT is not a
            fast process and thus, it can not happen on mint.
            <br /> <br />
            As soon as minting is done, I will be sequentially airdropping
            generated NFTs. I am working on making this process as fast as
            possible and completely automated!!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FAQModalButton;
