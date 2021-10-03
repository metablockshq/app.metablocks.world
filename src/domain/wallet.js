import { swap, deref, Atom } from "@dbeining/react-atom";
import { PublicKey, Connection } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import sha256 from "crypto-js/sha256";

import config from "~/config";
import augmentorIdl from "~/domain/augmentor.json";

const augmentorProgramId = new PublicKey(augmentorIdl.metadata.address);
const { Keypair, SystemProgram } = web3;
const baseAccount = Keypair.generate();

const errors = {};

const initState = {
  initAugmentorError: null,
  initialisingAugmentor: null,
  inventory: [],
  inventoryIndex: [],
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

  try {
    const buffer = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log("buffer ----->  ", buffer);
    swap(state, (s) => ({
      ...s,
      inventory: buffer.inventory,
      inventoryIndex: buffer.inventoryIndex,
    }));
  } catch (e) {
    console.log("readAugmentorError  ----->  ", e);
  }
};

const initAugmentor = async (wallet) => {
  const program = augmentorProgramFactory(wallet);
  const publicKey = wallet.publicKey.toString();

  try {
    swap(state, (s) => ({ ...state, initialisingAugmentor: true }));
    await program.rpc.init({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    swap(state, (s) => ({
      ...state,
      initialisingAugmentor: false,
      initAugmentorError: null,
    }));

    const buffer = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log(buffer);
  } catch (e) {
    swap(state, (s) => ({
      ...state,
      initialisingAugmentor: false,
      initAugmentorError: e,
    }));
  }
};

const listItem = async (wallet, name, price, json) => {
  const data = JSON.parse(json);
  const dataWithNameAndPrice = { ...data, name, price };
  const hash = sha256(JSON.stringify(dataWithNameAndPrice)).toString();
  const program = augmentorProgramFactory(wallet);

  try {
    await program.rpc.listItem(
      hash,
      btoa(JSON.stringify(dataWithNameAndPrice)),
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
  } catch (e) {
    console.log("error", e, e.msg);
  }

  await readAugmentor(wallet);
};

export default state;
export { readAugmentor, initAugmentor, listItem };
