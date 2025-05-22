// import { useAccount, useProvider } from "wagmi";
// import { useEffect, useState } from "react";
// import { Contract } from "ethers";
// import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

// export function useGetPendingGameId(setCheckingForPendingGameId) {
//   const provider = useProvider();
//   const { address } = useAccount();

//   const [data, setData] = useState({});

//   useEffect(() => {
//     if (address && provider) {
//       (async () => {
//         try {
//           setCheckingForPendingGameId(true);
//           const contract = new Contract(
//             COIN_FLIP_CONTRACT,
//             coinFlipABI,
//             provider
//           );
//           const gameId = await contract.addressToFlip(address);

//           let pendingNewFlip;
//           if (Number(gameId) !== 0) {
//             pendingNewFlip = await contract.flipToAddress(gameId);
//           }

//           setData({
//             gameId,
//             pendingNewFlip,
//           });
//         } catch (error) {
//           console.log("contract-read-error-for-addressToFlip", error);
//         }
//       })();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [address, provider]);

//   return data;
// }

// import { useReadContract,useAccount } from "wagmi";
// import {useState,useEffect} from 'react';
// import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

// export function useGetPendingGameId(setCheckingForPendingGameId) {

//   setCheckingForPendingGameId(true);
//   const {address } = useAccount();
//   const [checking,setChecking] = useState(false);
//   const [data,setData] = useState({});

//   const{
//     data:gameId,
//     refetch:refetchGameId,
//     isPending:isGameIdLoading
//   } = useReadContract({
//     address:COIN_FLIP_CONTRACT,
//     abi:coinFlipABI,
//     functionName:'addressToFlip',
//     args:[address],
//     query:{
//       enabled:!!address,
//     }
//   })

//   const{
//     data:pendingNewFlip,
//     isPending:isFlipLoading,
//   } = useReadContract({
//     address:COIN_FLIP_CONTRACT,
//     abi:coinFlipABI,
//     functionName:'flipToAddress',
//     args:[gameId],
//     query:{
//       enabled:!!address && !!gameId && gameId!==0n
//     }
//   });
//   useEffect(()=>{
//     const isLoading = isGameIdLoading || isFlipLoading;
//     setChecking(isLoading);

//     if(!isLoading){
//       setData({
//         gameId,
//         pendingNewFlip:gameId !==0n?pendingNewFlip:undefined
//       });
//     }
//   },[gameId,pendingNewFlip,isGameIdLoading,isFlipLoading]);

//   return {
//     ...data,
//     checking,
//     refetch:refetchGameId
//   }
// }

import { useAccount, useReadContract } from 'wagmi'
import { COIN_FLIP_CONTRACT, coinFlipABI } from '../utils'
import { useEffect, useState } from 'react'

export function useGetPendingGameId(setCheckingForPendingGameId) {
  const { address } = useAccount()
  const [pendingFlipData, setPendingFlipData] = useState({})

  // Step 1: Read `addressToFlip(address)`
  const {
    data: gameId,
    isSuccess: hasGameId,
    isLoading: isGameIdLoading,
  } = useReadContract({
    abi: coinFlipABI,
    address: COIN_FLIP_CONTRACT,
    functionName: 'addressToFlip',
    args: address ? [address] : undefined,
    enabled: !!address,
  })

  // Step 2: Conditionally fetch `flipToAddress(gameId)`
  const {
    data: pendingNewFlip,
    isSuccess: hasPendingFlip,
  } = useReadContract({
    abi: coinFlipABI,
    address: COIN_FLIP_CONTRACT,
    functionName: 'flipToAddress',
    args: gameId && Number(gameId) !== 0 ? [gameId] : undefined,
    enabled: !!gameId && Number(gameId) !== 0,
  })

  // Step 3: Combine both results
  useEffect(() => {
    if (isGameIdLoading) {
      setCheckingForPendingGameId(true)
    } else {
      setCheckingForPendingGameId(false)
    }

    if (hasGameId) {
      setPendingFlipData({
        gameId,
        pendingNewFlip: hasPendingFlip ? pendingNewFlip : undefined,
      })
    }
  }, [gameId, pendingNewFlip, isGameIdLoading, hasGameId, hasPendingFlip, setCheckingForPendingGameId])

  return pendingFlipData
}
