// import { useSigner } from "wagmi";
// import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";
// import { useState } from "react";
// import { Contract, utils } from "ethers";

// export function useApproveWrite(amount) {
//   const { data: signer } = useSigner();
//   const [states, setStates] = useState({
//     isLoading: false,
//     isSuccess: false,
//   });

//   const { isLoading, isSuccess } = states;

//   const approveWrite = async (amount) => {
//     try {
//       setStates((prevValue) => ({
//         ...prevValue,
//         isSuccess: false,
//         isLoading: true,
//       }));

//       const contract = new Contract(ERC_20_CONTRACT, erc20ABI, signer);
//       const tx = await contract.approve(
//         COIN_FLIP_CONTRACT,
//         utils.parseEther(amount)
//       );
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

//       console.log("contract-write-error-for-approve", error);
//     }
//   };

//   return {
//     approveWriteLoading: isLoading,
//     approveWriteSuccess: isSuccess,
//     approveWrite,
//   };
// }

// import {useWriteContract,useWaitForTransactionReceipt} from 'wagmi';
// import { COIN_FLIP_CONTRACT, erc20ABI, ERC_20_CONTRACT } from '../utils';
// import {useState} from 'react';

// export function useApproveWrite(){
//   const [isLoading,setIsLoading] = useState(false);
//   const [isSuccess,setIsSuccess] = useState(false);

//   const{
//     writeContract,
//     data:hash,
//     error:wrietError,
//     isPending:isWritePending
//   } = useWriteContract();

//   const {isLoading:isConfirming,isSuccess:isConfirmed} = useWaitForTransactionReceipt({hash});

//   const approveWrite = async(amount) =>{
//     try{
//       setIsLoading(true);
//       setIsSuccess(false);
//       writeContract({
//         address:ERC_20_CONTRACT,
//         abi:erc20ABI,
//         functionName:'approve',
//         args:[COIN_FLIP_CONTRACT,parseEther(amount)],
//       })
//     }catch(error){
//       console.error("contract write error for approve",error);
//       setIsLoading(false);
//     }
//   }

//   useEffect(()=>{
//     if(isConfirmed){
//       setIsLoading(false);
//       setIsSuccess(true);
//     }
//   },[isConfirmed]);

//   return {
//     approveWriteLoading: isLoading || isWritePending || isConfirming,
//     approveWriteSuccess:isSuccess,
//     approveWrite,
//     error : wrietError,
//   }
// }


import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { COIN_FLIP_CONTRACT, erc20ABI, ERC_20_CONTRACT } from '../utils';
import {parseEther} from 'viem';

export function useApproveWrite() {


  const {writeContract,isPending,isSuccess,error} = useWriteContract()

  const approveWrite=(amount)=>{
    writeContract({
      address: ERC_20_CONTRACT,
      abi: erc20ABI,
      functionName: 'approve',
      args: [COIN_FLIP_CONTRACT, parseEther(amount)],
    });
  }

  return {
    approveWrite,
    approveWriteLoading:isPending,
    approveWriteSuccess:isSuccess,
    approveWriteError:error
  }
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  
  // const { 
  //   writeContract, 
  //   data: hash,
  //   error: writeError,
  //   isPending: isWritePending
  // } = useWriteContract();
  
  // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // const approveWrite = async (amount) => {
  //   try {
  //     setIsLoading(true);
  //     setIsSuccess(false);
      
  //     writeContract({
  //       address: ERC_20_CONTRACT,
  //       abi: erc20ABI,
  //       functionName: 'approve',
  //       args: [COIN_FLIP_CONTRACT, parseEther(amount)],
  //     });
  //   } catch (error) {
  //     console.error("contract-write-error-for-approve", error);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isConfirmed) {
  //     setIsLoading(false);
  //     setIsSuccess(true);
  //   }
  // }, [isConfirmed]);

  // return {
  //   approveWriteLoading: isLoading || isWritePending || isConfirming,
  //   approveWriteSuccess: isSuccess,
  //   approveWrite,
  //   error: writeError,
  // };
}
