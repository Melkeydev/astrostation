import { Modal } from "./Modal";
import { useState } from "react";
export const Donations = () => {
  const [isModal, setModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        onClick={() => setModal(true)}
      >
        Donate
      </button>
      <Modal
        isVisible={isModal}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </>
  );
};
