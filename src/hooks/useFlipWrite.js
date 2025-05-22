// import { useSigner } from "wagmi";
// import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
// import { useState } from "react";
// import { Contract, utils } from "ethers";

// export function useFlipWrite() {
//   const { data: signer } = useSigner();
//   const [states, setStates] = useState({
//     isSuccess: false,
//     isLoading: false,
//   });

//   const { isSuccess, isLoading } = states;

//   const flipWrite = async (amount, isTail) => {
//     try {
//       setStates((prevValue) => ({
//         ...prevValue,
//         isSuccess: false,
//         isLoading: true,
//       }));

//       const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, signer);
//       const tx = await contract.flip(utils.parseEther(amount), isTail);
//       await tx.wait();

//       setStates((prevValue) => ({
//         ...prevValue,
//         isLoading: false,
//         isSuccess: true,
//       }));
//     } catch (error) {
//       setStates((prevValue) => ({
//         ...prevValue,
//         isLoading: false,
//       }));

//       console.log("contract-write-error-for-flip", error);
//     }
//   };

//   return {
//     flipWriteLoading: isLoading,
//     flipWrite,
//     flipWriteSuccess: isSuccess,
//   };
// }

import { useWriteContract } from 'wagmi';
import { COIN_FLIP_CONTRACT, coinFlipABI } from '../utils';
import {parseEther} from 'viem';

export function useFlipWrite() {


  const {writeContract,isPending,isSuccess,error} = useWriteContract();
  const flipWrite = (amount,isTail) =>{
    writeContract({
        address: COIN_FLIP_CONTRACT,
        abi: coinFlipABI,
        functionName: 'flip',
        args: [parseEther(amount),isTail],
    })
  }

  return {
    flipWrite,
    flipWriteLoading:isPending,
    flipWriteSuccess:isSuccess,
    flipWriteError:error
  }

}