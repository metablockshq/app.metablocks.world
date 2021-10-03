import { Switch, Route, BrowserRouter } from "react-router-dom";
import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import config from "~/config";
import Landing from "~/routes/landing";
import Mint from "~/routes/mint";
import Inventory from "~/routes/inventory";
import WalletSignalHandler from "~/shared/walletSignalHandler";

const providers = [
  [BrowserRouter, {}],

  // Solana wallet adapter providers
  [ConnectionProvider, { endpoint: config.solanaRpcEndpoint }],
  [WalletProvider, { wallets: config.solanaWallets, autoConnect: true }],
  [WalletModalProvider, {}],

  // perform global actions when wallet connects or disconnects
  [WalletSignalHandler, {}],
];

const RootProvider = ({ children }) =>
  providers.reduceRight(
    (acc, [Comp, props]) => <Comp {...props}>{acc}</Comp>,
    children
  );

const Routes = () => (
  <Switch>
    <Route path="/" exact={true} component={Landing} />
    <Route path="/mint" exact={true} component={Mint} />
    <Route path="/inventory" exact={true} component={Inventory} />
  </Switch>
);

const App = () => (
  <RootProvider>
    <Routes />
  </RootProvider>
);

export default App;
