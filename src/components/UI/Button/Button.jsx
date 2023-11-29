export default function Button({ label, button }) {
  return (
    <button
      {...button}
      className="border-0 bg-orange-800 px-5 py-2 text-orange-100 rounded-md hover:bg-orange-700"
    >
      {label}
    </button>
  );
}
