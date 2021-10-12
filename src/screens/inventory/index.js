import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAtom } from "@dbeining/react-atom";

import exampleBlocks from "~/exampleBlocks";
import walletState, { buyItemBypassContract } from "~/domain/wallet";
import Nav from "~/shared/nav";

const PurchaseConfirmationModal = ({ isOpen, onClose, onSimulatePurchase }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Simulate drop purchase transaction ?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Purchasing drops is not connected to the program yet. This
                    means that no SOL tokens will be transferred to the program.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    However the UI will update assuming the txn went through.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onSimulatePurchase}
                  >
                    Simulate Purchase
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const ItemCard = ({ item, onClick, isBought }) => {
  const { name, price, imageUrl } = item;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer"
      onClick={() => {
        if (!isBought) {
          setModalOpen(true);
        }
      }}
    >
      <PurchaseConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSimulatePurchase={() => {
          setModalOpen(false);
          onClick();
        }}
      />
      <div className="overflow-x-hidden rounded-2xl relative">
        <img
          className="h-40 rounded-2xl w-full object-cover"
          alt=""
          src={imageUrl}
        />
        <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:opacity-50 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </p>
      </div>
      <div className="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-0">{name}</p>
          <p className="text-md text-gray-800 mt-0">{price} SOL</p>
          {isBought && <p className="text-md text-red-800 mt-0">Purchased</p>}
        </div>
        <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Inventory = () => {
  const { inventory, boughtItemIndexes } = useAtom(walletState);
  return (
    <div>
      <Nav />
      <div className="p-4">
        <div className="font-bold text-5xl">Inventory</div>
        <div className="relative m-3 flex flex-wrap mx-auto justify-start">
          {inventory.map((itemB64) => {
            const item = JSON.parse(atob(itemB64));
            const index = exampleBlocks.findIndex((b) => b.name === item.name);

            return (
              <ItemCard
                key={itemB64}
                isBought={boughtItemIndexes.includes(index)}
                item={item}
                onClick={() => buyItemBypassContract(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
