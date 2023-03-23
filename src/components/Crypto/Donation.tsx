import { CryptoModal } from "./Modal";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../Common/Button";

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
        <Button
          type="button"
          className="donateButton flex items-center rounded-mdml-2 mb-2 px-4 py-2 font-medium  shadow-sm focus:outline-none"
          onClick={() => setIsCryptoModalOpen(true)}
          variant="bottomButton"
        >
          Donate
          <FaEthereum />
        </Button>
      </div>
    </>
  );
};
