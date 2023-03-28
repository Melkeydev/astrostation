export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="relative mt-5 flex rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
      <div className="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="mx-2 h-6 w-6 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
      </div>
      <label className="font-bold">{message}</label>
    </div>
  );
}
