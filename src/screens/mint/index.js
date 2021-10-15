import { useState, useEffect } from "react";
import { useAtom } from "@dbeining/react-atom";
import { useWallet } from "@solana/wallet-adapter-react";
import ReactJson from "react-json-view";

import exampleBlocks from "~/exampleBlocks";
import walletState from "~/domain/wallet";
import Nav from "~/shared/nav";
import { listItem, initAugmentor, readAugmentor } from "~/domain/wallet";
import TextInput from "~/shared/textInput";
import BlockPreview from "~/shared/blockPreview";

const ConnectWallet = () => (
  <div>Connect your wallet to continue. Make sure that you are on Devnet.</div>
);

const ContractState = () => {
  const { inventory, inventoryIndex } = useAtom(walletState);

  return (
    <div className="p-4 bg-black green rounded-lg black overflow-scroll">
      <div className="text-lg text-green-400">Contract State</div>
      <ReactJson src={{ inventory, inventoryIndex }} theme="monokai" />
    </div>
  );
};

const MintForm = ({ name, setName, price, setPrice, json, setJson }) => {
  const wallet = useWallet();
  const { isAugmentorReady } = useAtom(walletState);

  return (
    <div className="w-2/3">
      <div className="p-4 mt-3 card bg-yellow-100">
        <TextInput
          label="Name"
          placeholder="Jane Smith Original Shoes"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Price"
          placeholder="42"
          inputType="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextInput
          label="Json"
          placeholder={`{"type": "base", "attribute": "eye-color", "value": "brown"}`}
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />

        <button
          disabled={!isAugmentorReady}
          className="btn btn-primary mt-4"
          onClick={async () => {
            await listItem(wallet, name, price, json);
          }}
        >
          Submit
        </button>
      </div>
      {exampleBlocks.map((b) => (
        <button
          disabled={!isAugmentorReady}
          key={b.name}
          className="btn btn-sm my-3 mr-1"
          onClick={() => {
            setName(b.name);
            setPrice(b.price);
            setJson(b.json);
          }}
        >
          ex: {b.name}
        </button>
      ))}
    </div>
  );
};

const Actions = () => {
  const wallet = useWallet();
  const { isAugmentorReady, readingAugmentor } = useAtom(walletState);

  return (
    <div className="mt-4">
      <button
        className="btn btn-secondary text-black mr-3"
        disabled={isAugmentorReady}
        onClick={async () => {
          await initAugmentor(wallet);
        }}
      >
        init
      </button>
      <button
        disabled={!isAugmentorReady}
        className={`btn btn-secondary text-black ${
          readingAugmentor && "loading"
        }`}
        onClick={async () => {
          await readAugmentor(wallet);
        }}
      >
        check-init
      </button>
    </div>
  );
};

const Mint = () => {
  const wallet = useWallet();
  const { isAugmentorReady } = useAtom(walletState);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [json, setJson] = useState("");

  const isConnected = wallet.connected;

  // check program initialization state on mount
  useEffect(() => {
    readAugmentor(wallet);
  }, [wallet]);

  return (
    <>
      <Nav />
      <div className="p-4">
        <div className="font-bold text-5xl">Mint</div>
        {!isConnected && <ConnectWallet />}
        {isConnected && (
          <div className="flex w-screen items-start">
            <MintForm {...{ name, setName, price, setPrice, json, setJson }} />
            <div className="mx-10 mt-3 w-1/3">
              <BlockPreview {...{ name, price, json }} />
              {isAugmentorReady && <ContractState />}
              <Actions />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mint;
