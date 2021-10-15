import { getPhantomWallet } from "@solana/wallet-adapter-wallets";

const config = {
  discordInviteLink: "https://discord.gg/YUJq9kW3RV",
  twitterLink: "https://twitter.com/MetaBlocksHQ",

  solanaRpcEndpoint: "https://api.devnet.solana.com",
  solanaWallets: [getPhantomWallet()],
};

export default config;
