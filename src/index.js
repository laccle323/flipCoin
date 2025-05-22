// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// import "./polyfills";
// import {
//   RainbowKitProvider,
//   darkTheme,
//   getDefaultWallets,
// } from "rainbowkit-ui";
// import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { mainnet } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { WagmiProvider } from 'wagmi';
// import { config } from './wagmi';

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [
//     alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API }),
//     publicProvider(),
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: "Flip Coin Game",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   webSocketProvider,
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//       <WagmiProvider config={config}>

//     <WagmiConfig client={wagmiClient}>
//       <RainbowKitProvider
//         chains={chains}
//         theme={darkTheme({ accentColor: "#26c6da" })}
//       >
//         <QueryClientProvider client={new QueryClient()}>
//           <App />
//         </QueryClientProvider>
//       </RainbowKitProvider>
//     </WagmiConfig>
//     </WagmiProvider>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./polyfills";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { wagmiConfig } from './wagmi.config';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "rainbowkit-ui";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme({accentColor:"#24c6da"})}>
            <App/>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  </React.StrictMode>
)