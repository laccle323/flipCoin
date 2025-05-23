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

import {
    argentWallet,
    backpackWallet,
    berasigWallet,
    bestWallet,
    bifrostWallet,
    binanceWallet,
    bitgetWallet,
    bitskiWallet,
    bitverseWallet,
    bloomWallet,
    bybitWallet,
    clvWallet,
    coin98Wallet,
    coinbaseWallet,
    compassWallet,
    coreWallet,
    dawnWallet,
    desigWallet,
    enkryptWallet,
    foxWallet,
    frameWallet,
    frontierWallet,
    gateWallet,
    imTokenWallet,
    iopayWallet,
    kaiaWallet,
    kaikasWallet,
    krakenWallet,
    kresusWallet,
    ledgerWallet,
    magicEdenWallet,
    metaMaskWallet,
    mewWallet,
    nestWallet,
    oktoWallet,
    okxWallet,
    omniWallet,
    oneInchWallet,
    oneKeyWallet,
    paraSwapWallet,
    phantomWallet,
    rabbyWallet,
    rainbowWallet,
    ramperWallet,
    roninWallet,
    safeWallet,
    safeheronWallet,
    safepalWallet,
    subWallet,
    tahoWallet,
    talismanWallet,
    tokenPocketWallet,
    tokenaryWallet,
    trustWallet,
    uniswapWallet,
    valoraWallet,
    walletConnectWallet,
    wigwamWallet,
    xdefiWallet,
    zealWallet,
    zerionWallet,
  } from 'rainbowkit-ui/wallets';
  
import {http} from 'wagmi'
import { mainnet } from 'wagmi/chains'
import {Chain,getDefaultConfig} from 'rainbowkit-ui'
// export const wagmiConfig = createConfig({
//     chains:[mainnet],
//     transports:{
//         [mainnet.id]:http('https://eth-pokt.nodies.app/'),
//     }
// })
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

export const wagmiConfig = getDefaultConfig({
    appName:"Rainbowkit Demo",
    projectId,
    chains:[mainnet],
    wallets: [
        {
          groupName: 'Popular',
          wallets: [
            safeWallet,
            rainbowWallet,
            coinbaseWallet,
            metaMaskWallet,
            walletConnectWallet,
          ],
        },
        {
          groupName: 'Other',
          wallets: [
            argentWallet,
            backpackWallet,
            berasigWallet,
            bestWallet,
            bifrostWallet,
            binanceWallet,
            bitgetWallet,
            bitskiWallet,
            bitverseWallet,
            bloomWallet,
            bybitWallet,
            clvWallet,
            coin98Wallet,
            compassWallet,
            coreWallet,
            dawnWallet,
            desigWallet,
            enkryptWallet,
            foxWallet,
            frameWallet,
            frontierWallet,
            gateWallet,
            imTokenWallet,
            iopayWallet,
            kaiaWallet,
            kaikasWallet,
            krakenWallet,
            kresusWallet,
            ledgerWallet,
            magicEdenWallet,
            mewWallet,
            nestWallet,
            oktoWallet,
            okxWallet,
            omniWallet,
            oneInchWallet,
            oneKeyWallet,
            paraSwapWallet,
            phantomWallet,
            rabbyWallet,
            ramperWallet,
            roninWallet,
            safeheronWallet,
            safepalWallet,
            subWallet,
            tahoWallet,
            talismanWallet,
            tokenPocketWallet,
            tokenaryWallet,
            trustWallet,
            uniswapWallet,
            valoraWallet,
            wigwamWallet,
            xdefiWallet,
            zealWallet,
            zerionWallet,
          ],
        },
      ],
    // transports:{
    //     [mainnet.id]:http('https://eth-pokt.nodies.app/'),
    // }
})