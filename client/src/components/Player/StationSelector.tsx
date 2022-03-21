import { useSong } from "../../store";

export const StationSelector = () => {
  const { setSong, setToggledSong } = useSong();

  function setSongId(e: any) {
    const id = e.target.id;
    setSong(id);
    songSelected(id);
  }

  function songSelected(id: string) {
    setToggledSong(id);
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="form-check">
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            id="5qap5aO4i9A"
            onClick={setSongId}
          />
          <label className="form-check-label inline-block text-gray-800">
            Default Lofi Station
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            id="0uw1Adx0psw"
            onClick={setSongId}
          />
          <label className="form-check-label inline-block text-gray-800">
            Lofi Hip Hop Station
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="form-check">
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            id="aLqc8TdoLJ0"
            onClick={setSongId}
          />
          <label className="form-check-label inline-block text-gray-800">
            Rap Lofi Station
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            id="jWIqKujW0NY"
            onClick={setSongId}
          />
          <label className="form-check-label inline-block text-gray-800">
            Tokyo Lofi Station
          </label>
        </div>
      </div>
    </div>
  );
};
