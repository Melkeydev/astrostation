export default function TxList({ txs }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map(item => (
        <div
          key={item}
          className="mt-5 flex rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-3 text-teal-900 shadow-md"
        >
          <div className="flex break-all">
            <label className="font-bold">{item.hash}</label>
          </div>
        </div>
      ))}
    </>
  );
}
