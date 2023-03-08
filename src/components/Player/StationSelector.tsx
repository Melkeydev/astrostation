import { useSong } from "@Store";

export const StationSelector = () => {
  const { setSong, setToggledSong } = useSong();

  function setSongId(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as Element;
    const id = target.id;
    setSong(id);
    songSelected(id);
  }

  function songSelected(id: string) {
    setToggledSong(id);
  }
  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="flex justify-between">
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input float-left mt-1 mr-2 h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
              type="radio"
              name="flexRadioDefault"
              id="jfKfPfyJRdk"
              onClick={(e) => setSongId(e)}
            />
            Default Lofi Station
          </label>
        </div>
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input float-left mt-1 mr-2 h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
              type="radio"
              name="flexRadioDefault"
              id="e3L1PIY1pN8"
              onClick={(e) => setSongId(e)}
            />
            Lofi Coffee Station
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input float-left mt-1 mr-2 h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
              type="radio"
              name="flexRadioDefault"
              id="hi1cYzaLEig"
              onClick={(e) => setSongId(e)}
            />
            Lofi Hip Hop Station
          </label>
        </div>
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input float-left mt-1 mr-2 h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
              type="radio"
              name="flexRadioDefault"
              id="6uddGul0oAc"
              onClick={(e) => setSongId(e)}
            />
            Tokyo Lofi Station
          </label>
        </div>
      </div>
    </div>
  );
};
