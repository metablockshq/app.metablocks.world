import { useAtom } from "@dbeining/react-atom";

import walletState from "~/domain/wallet";
import exampleBlocks from "~/exampleBlocks";
import Nav from "~/shared/nav";
import BlockPreview from "~/shared/blockPreview";
import { stickersVisible } from "~/util/stickers";

const Alert = () => (
  <div className="alert mt-4">
    <div className="flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#009688"
        className="flex-shrink-0 w-6 h-6 mx-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      <label>
        <h4>Sticker generation is not on-chain</h4>
        <p className="text-sm text-base-content text-opacity-60">
          For the purpose of this demo, no SOL is transferred on in-order to
          make a purchase. The UI only reacts as if the txn was made. This was
          done to make the project demoable and save time with program
          integration.
        </p>
      </label>
    </div>
  </div>
);

const Sticker = ({ src }) => (
  <div
    className="artboard w-1/6 mr-2 mt-2 border-gray-300 border rounded-lg bg-cover"
    style={{ height: 240, backgroundImage: `url(${src})` }}
  ></div>
);

const Stickers = () => {
  const { boughtItemIndexes } = useAtom(walletState);
  return (
    <div>
      <div className="font-bold text-2xl">Stickers Available</div>
      {boughtItemIndexes.length > 0 && <Alert />}
      <div className="flex flex-wrap mt-4">
        {stickersVisible(boughtItemIndexes).map((sImgSrc) => (
          <Sticker src={sImgSrc} key={sImgSrc} />
        ))}
      </div>
    </div>
  );
};

const MetaBlocks = () => {
  const { boughtItemIndexes } = useAtom(walletState);

  return (
    <div className="pr-5">
      <div className="font-bold text-2xl">
        Meta Blocks owned ({boughtItemIndexes.length})
      </div>
      <div className="flex flex-wrap mt-8">
        {boughtItemIndexes.map((index) => {
          const item = exampleBlocks[index];
          return <BlockPreview key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

const Foundation = () => {
  return (
    <div>
      <Nav />
      <div className="p-4">
        <div className="font-bold text-5xl">Foundation</div>
        <div className="flex mt-8">
          <div className="w-1/4">
            <MetaBlocks />
          </div>
          <div className="w-3/4">
            <Stickers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundation;
