/* Component for customization buttons in top right of the screen */
export const CustomizationButton = (props) => {
    return (
        <div>
            <button
            type="button"
            className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
            onClick={() => props.changeModal(true)}
            >
                {props.title}
                {props.icon}
            </button>
            <div className="flex justify-end space-x-6">
                {props.modal}
            </div>
        </div>
    );
};
