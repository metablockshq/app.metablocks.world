import { swap, Atom } from "@dbeining/react-atom";
import { PublicKey, Connection } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import sha256 from "crypto-js/sha256";

import config from "~/config";
import augmentorIdl from "~/domain/augmentor.json";

const augmentorProgramId = new PublicKey(augmentorIdl.metadata.address);
const { Keypair, SystemProgram } = web3;
const baseAccount = Keypair.generate();

const initState = {
  readingAugmentor: false,
  reagAugmentorError: null,
  initAugmentorError: null,
  initialisingAugmentor: null,
  isAugmentorReady: false,
  inventory: [],
  inventoryIndex: [],
  txLog: [],
  boughtItemIndexes: [],
};

const state = Atom.of(initState);

const providerFactory = (wallet) => {
  const opts = {
    preflightCommitment: "processed",
  };

  const conn = new Connection(
    config.solanaRpcEndpoint,
    opts.preflightCommitment
  );
  return new Provider(conn, wallet, opts.preflightCommitment);
};

const augmentorProgramFactory = (wallet) => {
  const provider = providerFactory(wallet);
  return new Program(augmentorIdl, augmentorProgramId, provider);
};

const readAugmentor = async (wallet) => {
  const program = augmentorProgramFactory(wallet);
  swap(state, (s) => ({ ...s, readingAugmentor: true }));

  try {
    const buffer = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    swap(state, (s) => ({
      ...s,
      readingAugmentor: false,
      inventory: buffer.inventory,
      inventoryIndex: buffer.inventoryIndex,
    }));
  } catch (err) {
    swap(state, (s) => ({ ...s, readAugmentorError: err }));
  }
};

const initAugmentor = async (wallet) => {
  const program = augmentorProgramFactory(wallet);

  try {
    swap(state, (s) => ({ ...s, initialisingAugmentor: true }));
    const txId = await program.rpc.init({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    swap(state, (s) => ({
      ...s,
      initialisingAugmentor: false,
      initAugmentorError: null,
      isAugmentorReady: true,
      txLog: [...s.txLog, { type: "init", id: txId }],
    }));

    readAugmentor(wallet);
  } catch (e) {
    console.log("Augmentor init error", e);
    swap(state, (s) => ({
      ...s,
      initialisingAugmentor: false,
      initAugmentorError: e,
      isAugmentorReady: false,
    }));
  }
};

const listItem = async (wallet, name, price, json) => {
  const data = JSON.parse(json);
  const dataWithNameAndPrice = { ...data, name, price };
  const hash = sha256(JSON.stringify(dataWithNameAndPrice)).toString();
  const program = augmentorProgramFactory(wallet);

  try {
    const txId = await program.rpc.listItem(
      hash,
      btoa(JSON.stringify(dataWithNameAndPrice)),
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
    swap(state, (s) => ({
      ...s,
      txLog: [...s.txLog, { type: "create-drop-item", id: txId }],
    }));
  } catch (e) {
    console.log("error", e, e.msg);
  }

  await readAugmentor(wallet);
};

const buyItemBypassContract = (itemIndex) => {
  swap(state, (s) => ({
    ...s,
    boughtItemIndexes: [...s.boughtItemIndexes, itemIndex],
  }));
};

export default state;
export { readAugmentor, initAugmentor, listItem, buyItemBypassContract };
