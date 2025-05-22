// import { useProvider } from "wagmi";
// import { coinFlipABI, COIN_FLIP_CONTRACT } from "../utils";
// import { Contract } from "ethers";
// import { useEffect, useState } from "react";

// export function useListenNewFlipEvent(setNewFlip) {
//   const provider = useProvider();
//   const [removeListener, setRemoveListener] = useState();

//   useEffect(() => {
//     (async () => {
//       const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, provider);
//       contract.on("NewFlip", (user, amount, isTail, gameId, event) => {
//         setRemoveListener(event?.removeListener);
//         setNewFlip((prevValue) => ({
//           ...prevValue,
//           gameId,
//           user,
//           amount,
//           isTail,
//         }));
//       });
//     })();

//     return () => {
//       removeListener && removeListener();
//     };

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [provider]);
// }
import { coinFlipABI, COIN_FLIP_CONTRACT } from "../utils";
import { useWatchContractEvent } from "wagmi";
import { useEffect } from "react";

export function useListenNewFlipEvent(setNewFlip){
  const unwatch = useWatchContractEvent({
    address:COIN_FLIP_CONTRACT,
    abi:coinFlipABI,
    eventName:'NewFlip',
    onLogs:(log)=>{
      setNewFlip({
        gameId:log.args.gameId,
        user:log.args.user,
        amount:log.args.amount,
        isTail:log.args.isTaile,
        event:log
      })
    }
  })

  useEffect(()=>{
    return () =>unwatch?.();
  },[unwatch]);
  return {unwatch};
}