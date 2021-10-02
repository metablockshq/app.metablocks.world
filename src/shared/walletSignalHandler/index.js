import { useEffect } from "react";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

import {
  setWallet,
  computeProvider,
  computeAugmentorInitialized,
} from "~/domain/wallet";

const WalletSignalHandler = ({ children }) => {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  let publicKey = null;

  if (wallet.connected) {
    publicKey = wallet.publicKey.toString();
  }

  useEffect(async () => {
    // set wallet each time the connected public key changes
    setWallet(wallet, anchorWallet);

    if (wallet.connected) {
      // compute provider each time the connected public key chanages
      computeProvider(wallet);

      // check if augmentor program is initialized from this wallet
      await computeAugmentorInitialized(wallet);
    }
  }, [wallet, publicKey]);

  return <>{children}</>;
};

export default WalletSignalHandler;
