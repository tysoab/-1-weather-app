import { useContext } from "react";
import CurrencyContext from "../../store/currency-context";

export default function Country({ country, checkSupported }) {
  const currencyCtx = useContext(CurrencyContext);
  const isSuppoted = checkSupported.filter(
    (curr) => curr === country.currency
  ).length;

  return (
    <li
      className={`flex space-x-4 pb-4 mb-4 cursor-pointer hover:text-orange-600 hover:border-b-[1.5px] border-orange-700 
                transition-all duration-100 ${
                  !isSuppoted && "opacity-40 cursor-not-allowed border-b-0"
                }`}
      onClick={() =>
        isSuppoted && currencyCtx.handleSearchCountry(country.currency)
      }
    >
      <img className="w-8 h-8" src={country.flag} alt={country.name} />
      <span>{country.name}</span>
      <span>{country.currency}</span>
    </li>
  );
}
