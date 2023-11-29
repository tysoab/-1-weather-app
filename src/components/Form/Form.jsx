import { useContext, useEffect, useState } from "react";

import Button from "../UI/Button/Button";
import Container from "../UI/Container/Container";
import Select from "../UI/Select/Select";
import CurrencyContext from "../../store/currency-context";
import Input from "../UI/Input/Input";
import Countries from "../Countries/Countries";
import Spinner from "../UI/Spinner/Spinner";
import spinnerIcon from "../../assets/spinner-1.gif";
import { convertCurrency } from "../../util/http";

export default function Form() {
  const currencyCtx = useContext(CurrencyContext);
  const { from, to } = currencyCtx.toggle;

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    let timeoutID;
    if (formData) {
      timeoutID = setTimeout(async () => {
        const data = await convertCurrency(formData);
        if (data) {
          currencyCtx.handleConversion({
            to: formData.to,
            rate: data.rates[currencyCtx.to],
          });
          setFormData(null);
        }
      }, 1000);
    }

    return () => clearTimeout(timeoutID);
  }, [formData]);

  async function handleSubmit(event) {
    event.preventDefault();
    const convert = {
      amount: currencyCtx.amount,
      from: currencyCtx.from,
      to: currencyCtx.to,
    };
    setFormData(convert);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col my-10 items-center "
      >
        <Container className="flex gap-4 md:gap-8 items-center justify-center mx-auto">
          <Select
            label="From"
            option={
              currencyCtx.from && (
                <option value={currencyCtx.from}>{currencyCtx.from}</option>
              )
            }
            select={{
              value: currencyCtx.from,
              onClick: () => currencyCtx.handleFromTo("from"),
              disabled: from,
            }}
          />
          <div>
            &rarr;
            <br />
            &larr;
          </div>
          <Select
            label="To"
            option={
              currencyCtx.to && (
                <option value={currencyCtx.to}>{currencyCtx.to}</option>
              )
            }
            select={{
              value: currencyCtx.to,
              onClick: () => currencyCtx.handleFromTo("to"),
              disabled: to,
            }}
          />
        </Container>

        <div className="mt-8">
          <Input
            inputClass="bg-transparent w-[150px]"
            input={{
              type: "number",
              name: "amount",
              value: currencyCtx.amount >= 1 && currencyCtx.amount,
              onChange: (event) =>
                currencyCtx.handleAmount(+event.target.value),
            }}
          />
        </div>

        <div className="mt-7">
          <Button
            label={
              formData ? <Spinner icon={spinnerIcon} size={20} /> : "CONVERT"
            }
            button={{
              type: "submit",
              disabled:
                (currencyCtx.from &&
                  currencyCtx.to &&
                  currencyCtx.from === currencyCtx.to) ||
                !currencyCtx.from ||
                !currencyCtx.to ||
                !currencyCtx.amount,
            }}
          />
        </div>
      </form>
      {(from || to) && <Countries />}
    </>
  );
}
