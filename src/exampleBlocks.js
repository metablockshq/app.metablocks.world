const exampleBlocks = [
  {
    name: "Base Layer - Orange Hair, Black Eyes, Feminine",
    price: 0,
    json: JSON.stringify({
      type: "base-layer",
      eyeColor: "black",
      hairColor: "orange",
      appearance: "feminine",
      imageUrl: "/img/base/base-orange-hair.png",
    }),
  },
  {
    name: "Base Layer - Blonde Hair, Black Eyes, Feminine",
    price: 0,
    json: JSON.stringify({
      type: "base-layer",
      eyeColor: "black",
      hairColor: "blonde",
      appearance: "feminine",
      imageUrl: "/img/base/base-yellow-hair.png",
    }),
  },
  {
    name: "Bose Headphones",
    price: 1.3,
    json: JSON.stringify({
      type: "drop",
      color: "white",
      accent: "gold",
      imageUrl: "/img/base/headphones.jpeg",
    }),
  },
  {
    name: "Yellow Tshirt",
    price: 0.3,
    json: JSON.stringify({
      type: "drop",
      color: "yellow",
      style: 42,
      imageUrl: "/img/base/yellow-top.jpeg",
    }),
  },
  {
    name: "Blue Pants",
    price: 0.4,
    json: JSON.stringify({
      type: "drop",
      color: "blue",
      style: 87,
      imageUrl: "/img/base/blue-pants.jpeg",
    }),
  },
  {
    name: "Red Cape",
    price: 2.4,
    json: JSON.stringify({
      type: "drop",
      power: "flight",
      imageUrl: "/img/base/red-cape.jpeg",
    }),
  },
];

export default exampleBlocks;
