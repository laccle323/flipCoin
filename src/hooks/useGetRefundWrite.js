// import { useSigner } from "wagmi";
// import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
// import { useState } from "react";
// import { Contract } from "ethers";

// export function useGetRefundWrite() {
//   const { data: signer } = useSigner();
//   const [states, setStates] = useState({
//     isSuccess: false,
//     isLoading: false,
//   });

//   const { isLoading, isSuccess } = states;

//   const getRefundWrite = async () => {
//     try {
//       setStates((prevValue) => ({
//         ...prevValue,
//         isLoading: true,
//         isSuccess: false,
//       }));

//       const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, signer);
//       const tx = await contract.getRefund();
//       await tx.wait();

//       setStates((prevValue) => ({
//         ...prevValue,
//         isLoading: false,
//         isSuccess: true,
//       }));
//     } catch (error) {
//       setStates((prevValue) => ({ ...prevValue, isLoading: false }));

//       console.log("contract-write-error-for-getRefund", error);
//     }
//   };

//   return {
//     getRefundWriteLoading: isLoading,
//     getRefundWrite,
//     getRefundWriteSuccess: isSuccess,
//   };
// }

import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useWriteContract } from 'wagmi';

export function useGetRefundWrite() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  
  // const { 
  //   writeContract, 
  //   data: hash,
  //   error: writeError,
  //   isPending: isWritePending
  // } = useWriteContract();
  
  // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // const getRefundWrite = async() =>{
  //   try{
  //     setIsLoading(true);
  //     setIsSuccess(false);
  //     writeContract({
  //       address: COIN_FLIP_CONTRACT,
  //       abi: coinFlipABI,
  //       functionName: 'getRefund',
  //     });

  //   }catch(err){
  //     console.log("contract write error for getREfund",err);
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(()=>{
  //   if (isConfirmed) {
  //     setIsLoading(false);
  //     setIsSuccess(true);
  //   }
  // },[isConfirmed]);

  // return {
  //   getRefundWriteLoading : isLoading || isWritePending || isConfirming,
  //   getRefundSuccess: isSuccess,
  //   getRefundWrite,
  //   writeError
  // }
  const {writeContract,isPending,isSuccess,error} = useWriteContract()
  const getRefundWrite = ()=>{
    writeContract({
      abi:coinFlipABI,
      address:COIN_FLIP_CONTRACT,
      functionName:'getRefund',
    })
  }

  return {
    getRefundWrite,
    getRefundWriteLoading:isPending,
    getRefundWriteSuccess:isSuccess,
    getRefundWriteError:error
  }



}