const stickerPaths = [...Array(7).keys()].map((i) => `/img/stickers/s${i}.png`);

const stickers = {
  headphones: stickerPaths[0],
  posing: stickerPaths[1],
  peace: stickerPaths[2],
  thinking: stickerPaths[3],
  waving: stickerPaths[4],
  cape: stickerPaths[5],
  baseOrange: stickerPaths[6],
};

const stickersVisible = (metaBlockIndices) => {
  return metaBlockIndices.reduce((acc, mbIndex) => {
    // orange hair base
    if (mbIndex === 0) {
      return [...acc, stickers.baseOrange];
    }

    // bose headphones
    if (mbIndex === 2) {
      return [...acc, stickers.headphones];
    }

    // yellow tshirt
    if (mbIndex === 3) {
      return [
        ...acc,
        stickers.posing,
        stickers.peace,
        stickers.waving,
        stickers.thinking,
      ];
    }

    // bose headphones
    if (mbIndex === 5) {
      return [...acc, stickers.cape];
    }

    return acc;
  }, []);
};

export { stickersVisible };
