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
<<<<<<< HEAD
      <div className="fixed bottom-0">
        <Button
=======
      <div className="fixed bottom-0 z-10">
        <button
>>>>>>> 85273112609f47f3a4310b88bc1f2040fef02526
          type="button"
          className="donateButton flex items-center rounded-mdml-2 mb-2 px-4 py-2 ml-2 font-medium  shadow-sm focus:outline-none"
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
