import { useContext } from "react";
import CurrencyContext from "../../store/currency-context";
import Display from "./Display";

export default function Result() {
  const { from, to, amount, result } = useContext(CurrencyContext);

  if (from && to && amount) {
    return (
      <div className="mx-auto w-80 font-semibold">
        {from === to && <Display to={to} rate={amount} />}
        {from !== to && <Display to={result.to} rate={result.rate} />}
      </div>
    );
  }
}
