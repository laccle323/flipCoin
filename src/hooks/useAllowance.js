// import { useAccount, useProvider } from "wagmi";
// import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";
// import { useState, useEffect } from "react";
// import { Contract } from "ethers";

// export function useAllowance() {
//   const provider = useProvider();
//   const { address } = useAccount();

//   const [states, setStates] = useState({
//     isLoading: false,
//     isSuccess: false,
//     data: "",
//   });
//   const { isLoading, isSuccess, data } = states;

//   useEffect(() => {
//     if (address && provider) {
//       (async () => {
//         try {
//           setStates((prevValue) => ({
//             ...prevValue,
//             isLoading: true,
//             isSuccess: false,
//           }));

//           const contract = new Contract(ERC_20_CONTRACT, erc20ABI, provider);
//           const data = await contract.allowance(address, COIN_FLIP_CONTRACT);

//           setStates((prevValue) => ({
//             ...prevValue,
//             isLoading: false,
//             isSuccess: true,
//             data,
//           }));
//         } catch (error) {
//           setStates((prevValue) => ({
//             ...prevValue,
//             isLoading: false,
//           }));

//           console.log("contract-read-error-for-allowance", error);
//         }
//       })();
//     }
//   }, [address, provider]);

//   return {
//     allowance: isSuccess ? data : undefined,
//     isLoadingAllowance: isLoading,
//   };
// }


import { useReadContract,useAccount } from "wagmi";
import {useState,useEffect} from 'react';
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";
export function useAllowance(){
  const {address} = useAccount();
  const {data,isLoading,isSuccess} = useReadContract({
    abi:erc20ABI,
    address:ERC_20_CONTRACT,
    functionName:'allowance',
    args:address?[address,COIN_FLIP_CONTRACT]:undefined,
    enabled:!!address,
    watch:true,
  })

  return {
    allowance:isSuccess?data:undefined,
    isLoadingAllowance:isLoading
  }
}