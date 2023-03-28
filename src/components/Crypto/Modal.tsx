import "./Modal.scss";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@Components/Common/Button";
import ErrorMessage from "./Error";
import TxList from "./HashList";
import { IoCloseSharp } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    //@ts-ignore
    if (!window.ethereum) throw new Error("No crypto wallet found. Please install it.");

    //@ts-ignore
    await window.ethereum.send("eth_requestAccounts");
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

const isMetaMaskConnected = async () => {
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};

export const CryptoModal = ({ isVisible = false, onClose }) => {
  const [error, setError] = useState("");
  const [txs, setTxs] = useState([]);
  const [metaMaskConnected, setMetaMaskConnected] = useState(false);
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  const connectMetaMaskConnected = async () => {
    try {
      //@ts-ignore
      if (!window.ethereum) throw new Error("No crypto wallet found. Please install it.");

      //@ts-ignore
      await window.ethereum.send("eth_requestAccounts");
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getSigner();
      setTxs([{ hash: "MetaMask wallet connected" }]);
      setMetaMaskConnected(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const address = "0x39CFE0572DE24a92df064C8Fdf4C23DE6a2d6628";
    const data = new FormData(e.target);

    setError("");
    setTxs([]);

    if (!data.get("ether")) {
      setError("Please input value to donate");
      return;
    }

    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: address,
    });
  };

  useEffect(() => {
    isMetaMaskConnected().then(connected => {
      if (connected) {
        setMetaMaskConnected(true);
      } else {
        setMetaMaskConnected(false);
      }
    });
  }, [isVisible]);

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal " onClick={onClose}>
      <div className="modal-dialog dark:bg-gray-800 dark:text-gray-300" onClick={e => e.stopPropagation()}>
        <div className="flex justify-end">
          <div className="modal-header dark:bg-gray-800 dark:text-gray-300">
            <IoCloseSharp className="cursor-pointer text-red-500 hover:bg-red-200" onClick={onClose} />
          </div>
        </div>
        <div className="">
          <div className="w-full ">
            <form className="" onSubmit={handleSubmit}>
              <div className="mx-auto w-full rounded-xl bg-white shadow-lg dark:bg-gray-800 dark:text-gray-300 sm:w-auto">
                <main className="pl-4 pr-4 pb-4">
                  <h1 className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Connect MetaMask Wallet and Donate
                  </h1>
                  <div>
                    <div className="flex h-10 items-center">
                      <div className="flex items-center bg-violet-700 px-4 py-2 font-medium text-white focus:outline-none dark:bg-violet-800 dark:text-gray-200">
                        <FaEthereum className="h-6 w-6" />
                        ETH
                      </div>
                      <input
                        name="ether"
                        type="text"
                        className="m-1 block h-10 w-full border border-gray-300 py-2 px-3 text-lg focus:outline-none focus:ring dark:border-gray-500 dark:bg-gray-700"
                        placeholder="0.00197 ETH"
                      />
                    </div>
                  </div>
                </main>
                <footer className="p-4">
                  {!metaMaskConnected ? (
                    <Button
                      variant="bottomButton"
                      type="button"
                      className="w-full focus:outline-none focus:ring"
                      onClick={() => connectMetaMaskConnected()}
                    >
                      Connect MetaMask wallet
                    </Button>
                  ) : (
                    <Button variant="bottomButton" type="submit" className="w-full focus:outline-none focus:ring">
                      Donate Now
                    </Button>
                  )}
                  <ErrorMessage message={error} />
                  <TxList txs={txs} />
                </footer>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
