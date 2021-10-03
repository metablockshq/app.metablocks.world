import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import Nav from "~/shared/nav";
import { listItem, initAugmentor, readAugmentor } from "~/domain/wallet";
import TextInput from "~/shared/textInput";

const ConnectWallet = () => <div>Connect your wallet to continue</div>;

const BlockPreview = ({ name, price, json }) => {
  const stringifiedBlock = JSON.stringify(
    {
      name,
      price,
      content: json,
    },
    null,
    2
  );

  return (
    <div className="p-4 bg-black green rounded-lg black overflow-scroll">
      <div className="text-lg text-green-400">Meta Block Preview</div>
      <div>{stringifiedBlock}</div>
    </div>
  );
};

const exampleBlocks = [
  {
    name: "Nike Jordan Meta Flex",
    price: 400,
    json: JSON.stringify({
      color: "#377090",
      id: "jordan-3582",
      year: 2021,
      sole: "pink",
      laces: "red",
      cushion: "medium",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9f2c5ef7-da79-4c27-b6ca-c416cdbeaffa/air-jordan-1-mid-shoe-86f1ZW.png",
    }),
  },
  {
    name: "Collar Wrap Dress by Namelazz",
    price: 870,
    json: JSON.stringify({
      color: "#333",
      fit: "medium",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0516/2342/8284/products/product-image-1624414719.jpg?v=1607542227",
    }),
  },
  {
    name: "Base eye color hazel",
    price: 0,
    json: JSON.stringify({
      type: "base",
      attribute: "eye-color",
      value: "brown",
      imageUrl:
        "https://media.istockphoto.com/photos/beauty-shines-brilliantly-in-her-gaze-picture-id174987003?k=20&m=174987003&s=612x612&w=0&h=r8eOltu2AyWb_FEfArMsB8Q1-fTeCLqUc2G5_DUi3Gk=",
    }),
  },
  {
    name: "Base height tall",
    price: 0,
    json: JSON.stringify({
      type: "base",
      attribute: "height",
      value: "184",
      imageUrl:
        "https://www.clipartkey.com/mpngs/m/67-677815_human-body-png-icon-human-body-silhouette-png.png",
    }),
  },
  {
    name: "Base eye color blue",
    price: 0,
    json: JSON.stringify({
      type: "base",
      attribute: "eye-color",
      value: "brown",
      imageUrl:
        "https://www.worldatlas.com/r/w768/upload/62/7f/15/shutterstock-128857243.jpg",
    }),
  },
];

const MintForm = ({ name, setName, price, setPrice, json, setJson }) => {
  const wallet = useWallet();
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
  return (
    <div className="mt-4">
      <button
        className="btn btn-secondary text-black mr-3"
        onClick={async () => {
          await initAugmentor(wallet);
        }}
      >
        init
      </button>
      <button
        className="btn btn-secondary text-black"
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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [json, setJson] = useState("");

  const isConnected = wallet.connected;

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
              <Actions />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mint;
