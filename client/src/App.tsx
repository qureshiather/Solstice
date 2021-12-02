import "./App.css";
import { useMemo } from "react";

import Home from "./Home";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Generator } from "./routes/Generator";
// import { Generator } from "./routes/Generator";

const configVar = {
  "REACT_APP_CANDY_MACHINE_CONFIG": "8oeoekuw22jspvXARtvTKAKJ4xJgu7y7jioEwd1797xd",
  "REACT_APP_CANDY_MACHINE_ID": "3EYXvga3NMahHv43CLMfSedhat5uRhJWmQFdgXnc7Y7e",
  "REACT_APP_TREASURY_ADDRESS": "6bj4Wykh6nN49NyLfra12k8xSMronoSXrPVZd5ntcHG",
  "REACT_APP_CANDY_START_DATE": "1638489600",
  "REACT_APP_SOLANA_NETWORK": "mainnet-beta",
  "REACT_APP_SOLANA_RPC_HOST": "https://ssc-dao.genesysgo.net"
}

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS || configVar.REACT_APP_TREASURY_ADDRESS
);

const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG || configVar.REACT_APP_CANDY_MACHINE_CONFIG
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID || configVar.REACT_APP_CANDY_MACHINE_ID
);

const network = (process.env.REACT_APP_SOLANA_NETWORK || configVar.REACT_APP_SOLANA_NETWORK) as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST || configVar.REACT_APP_SOLANA_RPC_HOST;

const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE || configVar.REACT_APP_CANDY_START_DATE, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1CE2E6",
    },
    secondary: {
      main: "#e709e7",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "Orbitron",
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletDialogProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      candyMachineId={candyMachineId}
                      config={config}
                      connection={connection}
                      startDate={startDateSeed}
                      treasury={treasury}
                      txTimeout={txTimeout}
                    />
                  }
                />
                <Route path="/generator" element={<Generator/>} />
              </Routes>
            </BrowserRouter>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
