import { stickersVisible } from "~/util/stickers";

const Sticker = ({ src }) => (
  <img
    src={src}
    alt=""
    className="artboard object-cover bg-center mt-2 border-gray-300 border rounded-lg"
    style={{ height: 240 }}
  />
);

const Stickers = () => {
  // hard code for now because data is not persisent
  const boughtItemIndexes = [0, 1, 2, 3, 4, 5];
  return (
    <div>
      <div className="font-bold text-2xl">Stickers Available</div>

      <div className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-4">
        {stickersVisible(boughtItemIndexes).map((sImgSrc) => (
          <Sticker src={sImgSrc} key={sImgSrc} />
        ))}
      </div>
    </div>
  );
};

const BrowserExtension = () => {
  return (
    <div>
      <div className="p-4">
        <div className="font-bold text-md"></div>
        <Stickers />
      </div>
    </div>
  );
};

export default BrowserExtension;
