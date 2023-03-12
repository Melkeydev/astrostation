import { CryptoModal } from "./Modal";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";

export const CryptoDonationButton = () => {
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end space-x-6">
        <CryptoModal
          isVisible={isCryptoModalOpen}
          onClose={() => setIsCryptoModalOpen(false)}
        />
      </div>
      <div className="fixed bottom-0">
        <button
          type="button"
          className="donateButton flex items-center rounded-md bg-violet-700 ml-2 mb-2 px-4 py-2 font-medium text-white shadow-sm focus:outline-none dark:bg-violet-700 dark:text-violet-200"
          onClick={() => setIsCryptoModalOpen(true)}
        >
          Donate
          <FaEthereum />
        </button>
      </div>
    </>
  );
};
