import { swap, deref, Atom } from "@dbeining/react-atom";
import { PublicKey, Connection } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";

import config from "~/config";
import augmentorIdl from "~/domain/augmentor.json";

const augmentorProgramId = new PublicKey(augmentorIdl.metadata.address);
const { SystemProgram } = web3;

const errors = {
  providerNotSet: "The provider is not initialized",
};

const initState = {
  wallet: null,
  anchorWallet: null,
  isConnected: false,
  provider: null,
  initAugmentorError: null,
  initialisingAugmentor: null,
};

const state = Atom.of(initState);

const setWallet = (wallet, anchorWallet) => {
  swap(state, (state) => {
    return { ...state, wallet, anchorWallet, isConnected: wallet.connected };
  });
};

const computeProvider = (wallet) => {
  const opts = {
    preflightCommitment: "processed",
  };

  const conn = new Connection(
    config.solanaRpcEndpoint,
    opts.preflightCommitment
  );
  const provider = new Provider(conn, wallet, opts.preflightCommitment);

  swap(state, (state) => {
    return { ...state, provider };
  });
};

const computeAugmentorInitialized = async (wallet) => {
  const { provider } = deref(state);
  const program = new Program(augmentorIdl, augmentorProgramId, provider);

  /* const buffer = await program.account.baseAccount.fetch(wallet.publicKey);

   * console.log("determineaugmentorinitilizationstate", buffer); */
};

const initAugmentor = async (wallet) => {
  const { provider } = deref(state);
  const program = new Program(augmentorIdl, augmentorProgramId, provider);
  const publicKey = wallet.publicKey.toString();

  if (!provider) {
    swap(state, (s) => ({ ...s, initAugmentorError: errors.providerNotSet }));
  }

  try {
    swap(state, (s) => ({ ...state, initialisingAugmentor: true }));
    await program.rpc.init({
      accounts: {
        baseAccount: wallet.publicKey.toString(),
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [wallet],
    });
    swap(state, (s) => ({
      ...state,
      initialisingAugmentor: false,
      initAugmentorError: null,
    }));

    computeAugmentorInitialized(wallet);
  } catch (e) {
    swap(state, (s) => ({
      ...state,
      initialisingAugmentor: false,
      initAugmentorError: e,
    }));
  }
};

const listItem = (hash, name, price, json) => {
  const data = JSON.parse(json);
  const dataWithNameAndHash = { ...data, name, hash };
};

export default state;
export { setWallet, computeProvider, computeAugmentorInitialized };
