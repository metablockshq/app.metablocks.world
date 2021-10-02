import { getPhantomWallet } from "@solana/wallet-adapter-wallets";

const config = {
  discordInviteLink: "https://discord.gg/YUJq9kW3RV",
  twitterLink: "https://twitter.com/MetaBlocksHQ",

  solanaRpcEndpoint: "http://127.0.0.1:8899",
  solanaWallets: [getPhantomWallet()],
};

export default config;
