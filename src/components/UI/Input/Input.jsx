export default function Input({ label, input, inputClass }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        {...input}
        className={`bg-orange-50 text-orange-600 px-4 py-1 w-full text-lg md:text-xl
         placeholder:text-orange-600 outline-none border-[1.5px] border-orange-800 rounded-md ${inputClass}`}
      />
    </div>
  );
}
