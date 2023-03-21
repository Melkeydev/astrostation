import { FaInfo } from "react-icons/fa";

export const SeoToggle = ({ onClick }: {onClick}) => {
  return(
<div className="fixed bottom-0 left-60">
        <button
          onClick={onClick}
          type="button"
          className="seoToggle flex items-center rounded-md bg-violet-700 ml-2 mb-2 px-4 py-2 font-medium text-white shadow-sm focus:outline-none dark:bg-violet-700 dark:text-violet-200"
        >
          <FaInfo/>
        </button>
      </div>
  )
};