import { useState } from "react";
import { useAtom } from "@dbeining/react-atom";
import sha256 from "crypto-js/sha256";

import Nav from "~/shared/nav";
import walletAtom from "~/domain/wallet";
import TextInput from "~/shared/textInput";

const ConnectWallet = () => <div>Connect your wallet to continue</div>;

const BlockPreview = ({ name, price, json }) => {
  let parsedJson = "{}";
  try {
    parsedJson = JSON.parse(json);
  } catch (e) {}

  const stringifiedBlock = JSON.stringify({ name, price, content: parsedJson });
  const hash = sha256(stringifiedBlock);
  const stringifiedBlockWithHash = JSON.stringify({
    hash: hash.toString(),
    name,
    price,
    content: parsedJson,
  });

  return (
    <div className="p-4 mx-10 mt-3 bg-black green rounded-lg black w-1/3 overflow-scroll">
      <div className="text-lg text-green-400">Meta Block Preview</div>
      <div>{stringifiedBlockWithHash}</div>
    </div>
  );
};

const MintForm = ({ name, setName, price, setPrice, json, setJson }) => {
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

        <button className="btn btn-primary mt-4 ">Submit</button>
      </div>
    </div>
  );
};

const Mint = () => {
  const { isConnected } = useAtom(walletAtom);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [json, setJson] = useState("");

  return (
    <>
      <Nav />
      <div className="p-4">
        <div className="font-bold text-5xl">Mint</div>
        {!isConnected && <ConnectWallet />}
        {isConnected && (
          <div className="flex w-screen items-start">
            <MintForm {...{ name, setName, price, setPrice, json, setJson }} />
            <BlockPreview {...{ name, price, json }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Mint;
