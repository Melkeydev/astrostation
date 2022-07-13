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
    <div className="dark:text-gray-200 text-gray-800">
      <div className="flex justify-between">
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
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
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
              type="radio"
              name="flexRadioDefault"
              id="0uw1Adx0psw"
              onClick={(e) => setSongId(e)}
            />
            Lofi Hip Hop Station
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
              type="radio"
              name="flexRadioDefault"
              id="aLqc8TdoLJ0"
              onClick={(e) => setSongId(e)}
            />
            Rap Lofi Station
          </label>
        </div>
        <div className="form-check flex-1">
          <label className="form-check-label inline-block cursor-pointer">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
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
