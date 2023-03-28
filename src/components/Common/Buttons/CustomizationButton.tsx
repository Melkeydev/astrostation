/* Component for customization buttons in top right of the screen */
export const CustomizationButton = props => {
  return (
    <div>
      <button
        type="button"
        className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        onClick={() => props.changeModal(true)}
      >
        {props.title}
        {props.icon}
      </button>
      <div className="flex justify-end space-x-6">{props.modal}</div>
    </div>
  );
};
