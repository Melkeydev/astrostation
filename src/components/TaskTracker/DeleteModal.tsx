export const DeleteModal = ({ task, show, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="max-w-xs rounded-lg bg-white p-2 px-1 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <div className="border-gray-100 pb-2">
          <div className="rounded pb-2 text-center font-bold">
            Are you sure you want to delete "{task.description}"?
          </div>
          <hr className="border-t-3 mx-auto w-1/4 border-[#5c5c5c]" />
          <div className=" mt-3 flex justify-center">
            <button onClick={onConfirm} className="mx-2 rounded bg-red-500 px-1 py-1 text-white ">
              Delete
            </button>
            <button onClick={onCancel} className="mx-2 rounded bg-gray-300 px-1 py-1 text-black ">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
