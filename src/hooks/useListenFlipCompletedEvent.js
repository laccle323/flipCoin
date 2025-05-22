// import { useProvider } from "wagmi";
// import { coinFlipABI, COIN_FLIP_CONTRACT } from "../utils";
// import { Contract } from "ethers";
// import { useEffect, useState } from "react";

// export function useListenFlipCompletedEvent(setFlipCompleted) {
//   const provider = useProvider();
//   const [removeListener, setRemoveListener] = useState();

//   useEffect(() => {
//     (async () => {
//       const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, provider);
//       contract.on(
//         "FlipCompleted",
//         (player, didWin, isTail, amount, gameId, event) => {
//           setRemoveListener(event?.removeListener);
//           setFlipCompleted((prevValue) => ({
//             ...prevValue,
//             gameId,
//             isTail,
//             player,
//             didWin,
//             amount,
//           }));
//         }
//       );
//     })();

//     return () => {
//       removeListener && removeListener();
//     };

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [provider]);
// }

import { useWatchContractEvent } from "wagmi"
import { useEffect } from "react"
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

export function useListenFlipCompletedEvent(setFlipCompleted) {
  const unwatch = useWatchContractEvent({
    address:COIN_FLIP_CONTRACT,
    abi : coinFlipABI,
    eventName:'FlipCompleted',
    onLogs:(log) => {
      const {args} = log;
      setFlipCompleted(pref => ({
        ...ProgressEvent,
        gameId:args.gameId,
        isTail:args.isTail,
        player:args.player,
        didWin:args.didWin,
        amount:args.amount,
        event:log
      }))

    }
  })

  useEffect(()=>{
    return () =>{
      unwatch?.();
    }
  },[unwatch])
  return {unwatch};
} 