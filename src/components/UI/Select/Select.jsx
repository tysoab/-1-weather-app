export default function ({ label, select, option }) {
  return (
    <div className="flex gap-3">
      <label>{label}:</label>
      <select
        {...select}
        className="outline-none border-[1.5px] border-orange-700 bg-transparent px-2 py-1 min-w-[100px] text-lg"
      >
        {option}
      </select>
    </div>
  );
}
