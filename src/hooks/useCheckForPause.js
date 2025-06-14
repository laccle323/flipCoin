// import { useProvider } from "wagmi";
// import { useEffect, useState } from "react";
// import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
// import { Contract } from "ethers";

// export function useCheckForPause() {
//   const provider = useProvider();
//   const [pause, setPause] = useState(false);

//   useEffect(() => {
//     if (provider) {
//       (async () => {
//         try {
//           const contract = new Contract(
//             COIN_FLIP_CONTRACT,
//             coinFlipABI,
//             provider
//           );
//           const data = await contract.pause();

//           setPause(data);
//         } catch (error) {
//           console.log("contract-read-error-pause", error);
//         }
//       })();
//     }
//   }, [provider]);

//   return { pause };
// }


import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useReadContract } from "wagmi";

export function useCheckForPause() {
  const {
    data,
    isSuccess,
  } = useReadContract({
    address:COIN_FLIP_CONTRACT,
    abi:coinFlipABI,
    functionName:'pause',
  })

  return {
    pause:isSuccess?data:false,
  }
}