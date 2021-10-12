import { NavLink } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const menuItems = [
  { label: "Mint", to: "/mint" },
  { label: "Foundation", to: "/" },
  { label: "Inventory", to: "/inventory" },
  { label: "Transactions", to: "/transactions" },
  { label: "Help", to: "/help" },
];

const Menu = ({ items }) => (
  <div className="flex-1 px-2 mx-2">
    <div className="items-stretch hidden lg:flex">
      {items.map((i) => (
        <NavLink
          activeClassName="btn-disabled border-white border-solid"
          key={i.label}
          exact={true}
          className="btn btn-ghost btn-sm rounded-btn"
          to={i.to}
        >
          {i.label}
        </NavLink>
      ))}
    </div>
  </div>
);

// eslint-disable-next-line
const LeftButton = () => (
  <div className="flex-none hidden lg:flex">
    <button className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-6 h-6 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
  </div>
);

// eslint-disable-next-line
const Search = () => (
  <>
    <div className="flex-1 lg:flex-none mr-1">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-ghost" />
      </div>
    </div>
    <div className="flex-none">
      <button className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </>
);

const Wallet = () => (
  <div className="flex-none">
    <WalletMultiButton />
  </div>
);

const Nav = () => (
  <div className="navbar m-4 shadow-lg bg-green-600 text-neutral-content rounded-box">
    <div className="flex-1 hidden px-2 mx-2 lg:flex">
      <span className="text-lg font-bold ml-3">Meta Blocks Beta</span>
    </div>
    <Menu items={menuItems} />
    <Wallet />
  </div>
);

export default Nav;
