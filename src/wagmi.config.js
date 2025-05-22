// src/wagmi.config.ts
// import {  createConfig } from 'wagmi';
// import { mainnet } from 'wagmi/chains';
// import { getDefaultConfig } from 'rainbowkit-ui';


// export const config = createConfig(
//   getDefaultConfig({
//     appName: 'Flip Coin Game',
//     projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
//     chains,
//     publicClient,
//     webSocketPublicClient,
//   })
// );


import {createConfig,http} from 'wagmi'
import { mainnet } from 'wagmi/chains'
export const wagmiConfig = createConfig({
    chains:[mainnet],
    transports:{
        [mainnet.id]:http('https://eth-pokt.nodies.app/'),
    }
})