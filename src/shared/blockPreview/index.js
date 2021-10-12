import ReactJson from "react-json-view";

const BlockPreview = ({ name, price, json }) => {
  const block = {
    name,
    price,
    content: JSON.parse("{}" || json),
  };

  return (
    <div className="w-full p-4 bg-black green rounded-lg black overflow-scroll">
      <div className="text-lg text-green-400">Meta Block Preview</div>
      <ReactJson src={block} theme="monokai" />
    </div>
  );
};

export default BlockPreview;
