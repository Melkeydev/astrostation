import "./Modal.scss";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "../Common/Button";
import ErrorMessage from "./Error";
import TxList from "./HashList";
import { IoCloseSharp } from "react-icons/io5";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    //@ts-ignore
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

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

export const Modal = ({ isVisible = false, onClose }) => {
  const [error, setError] = useState("");
  const [txs, setTxs] = useState([]);
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = "0x39CFE0572DE24a92df064C8Fdf4C23DE6a2d6628";
    const data = new FormData(e.target);
    setError("");
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: address,
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end">
          <div className="modal-header">
            <IoCloseSharp
              className="text-red-500 cursor-pointer hover:bg-red-200"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="">
          <div className="w-full">
            <form className="" onSubmit={handleSubmit}>
              <div className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                <main className="p-4">
                  <h1 className="text-xl font-semibold text-gray-700 text-center">
                    Connect MetaMask Wallet and Donate
                  </h1>
                  <div>
                    <div className="my-3">
                      <input
                        name="ether"
                        type="text"
                        className="w-full h-10 m-1 py-2 px-3 text-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-500 block focus:ring focus:outline-none"
                        placeholder="Amount in ETH"
                      />
                    </div>
                  </div>
                </main>
                <footer className="p-4">
                  <Button
                    variant="crypto"
                    type="submit"
                    className="focus:ring focus:outline-none w-full"
                  >
                    Donate Now
                  </Button>
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
