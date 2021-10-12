import { useAtom } from "@dbeining/react-atom";

import walletState from "~/domain/wallet";
import Nav from "~/shared/nav";

const getTxUrl = (txId) =>
  `https://explorer.solana.com/tx/${txId}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899`;

const Tx = ({ tx }) => (
  <div>
    <div>Type: {tx.type}</div>
    <div>
      ID:{" "}
      <a
        className="link link-neutral"
        target="_blank"
        rel="noreferrer"
        href={getTxUrl(tx.id)}
      >
        {tx.id}
      </a>
    </div>
  </div>
);

const Transactions = () => {
  const { txLog } = useAtom(walletState);

  return (
    <div>
      <Nav />
      <div className="p-4">
        <div className="font-bold text-5xl">Transactions</div>
        <div>
          {txLog.map((tx) => (
            <Tx key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
