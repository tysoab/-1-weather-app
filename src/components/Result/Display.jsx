export default function ({ to, rate }) {
  return (
    <>
      {rate && (
        <h2 className="text-center mb-6 text-orange-950">Conversion rate:</h2>
      )}
      <div className="flex space-x-5">
        <span className="text-4xl">{rate}</span>
        <span className="text-sm">{to}</span>
      </div>
    </>
  );
}
