import { Switch, Route, BrowserRouter } from "react-router-dom";
import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import config from "~/config";
import Foundation from "~/screens/foundation";
import Mint from "~/screens/mint";
import Inventory from "~/screens/inventory";
import Transactions from "~/screens/transactions";
import BrowserExtension from "~/screens/browserExtension";
import Help from "~/screens/help";
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
    <Route path="/" exact={true} component={Foundation} />
    <Route path="/mint" exact={true} component={Mint} />
    <Route path="/inventory" exact={true} component={Inventory} />
    <Route path="/transactions" exact={true} component={Transactions} />
    <Route path="/help" exact={true} component={Help} />
    <Route
      path="/browser-extension"
      exact={true}
      component={BrowserExtension}
    />
  </Switch>
);

const App = () => (
  <RootProvider>
    <Routes />
  </RootProvider>
);

export default App;
