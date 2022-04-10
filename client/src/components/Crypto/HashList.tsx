export default function TxList({ txs }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div
          key={item}
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-5"
        >
          <div className="flex-1">
            <label className="font-bold">{item.hash}</label>
          </div>
        </div>
      ))}
    </>
  );
}
