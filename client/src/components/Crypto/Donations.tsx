import { Modal } from "./Modal";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";
export const Donations = () => {
  const [isModal, setModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="flex items-center rounded-md shadow-sm px-4 py-2 bg-violet-700 text-white font-medium focus:outline-none dark:bg-violet-700 dark:text-violet-200"
        onClick={() => setModal(true)}
      >
        Donate
        <FaEthereum />
      </button>
      <Modal isVisible={isModal} onClose={() => setModal(false)} />
    </>
  );
};
