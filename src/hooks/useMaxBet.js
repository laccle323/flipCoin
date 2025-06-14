// import { useProvider } from "wagmi";
// import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
// import { useEffect, useState } from "react";
// import { Contract } from "ethers";

// export function useMaxBet() {
//   const provider = useProvider();
//   const [states, setStates] = useState({
//     data: "",
//     isSuccess: false,
//   });

//   const { data, isSuccess } = states;

//   useEffect(() => {
//     if (provider) {
//       (async () => {
//         try {
//           setStates((prevValue) => ({
//             ...prevValue,
//             isSuccess: false,
//           }));

//           const contract = new Contract(
//             COIN_FLIP_CONTRACT,
//             coinFlipABI,
//             provider
//           );
//           const data = await contract.maxBet();

//           setStates((prevValue) => ({ ...prevValue, isSuccess: true, data }));
//         } catch (error) {
//           console.log("contract-read-error-maxBet", error);
//         }
//       })();
//     }
//   }, [provider]);

//   return isSuccess ? data : undefined;
// }
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useReadContract } from "wagmi";
export function useMaxBet() {
  const {
    data,
    isSuccess,
  } = useReadContract({
    address:COIN_FLIP_CONTRACT,
    abi:coinFlipABI,
    functionName:'maxBet'
  })
  // return {
  //   maxBet:isSuccess?maxBet:undefined,
  //   isLoading,
  //   error,
  //   refetch
  // }
  return isSuccess?data:undefined;
}
