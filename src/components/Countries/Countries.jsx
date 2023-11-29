import { useContext, useEffect, useRef, useState } from "react";
import Container from "../UI/Container/Container";
import Input from "../UI/Input/Input";
import CurrencyContext from "../../store/currency-context";
import Country from "./Country";
import Spinner from "../UI/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../util/http";

export default function Countries() {
  const currencyCtx = useContext(CurrencyContext);
  const { searchTerm, countries } = currencyCtx;
  const [filteredCountries, setFilteredCountries] = useState(
    countries.length > 0 ? countries.sort((a, b) => a.name - b.name) : []
  );
  const [supportedCountries, setSupportedCountries] = useState([]);
  const inputRef = useRef();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["supported"],
    queryFn: ({ signal, type }) =>
      fetchCountries({ signal, type: "supported" }),
    staleTime: 5000,
  });

  let supportedData = ["EUR"];
  if (data) {
    for (let key in data.rates) {
      supportedData.push(key);
    }
  }

  useEffect(
    function () {
      const timeoutID = setTimeout(() => {
        if (isSuccess) {
          setSupportedCountries(supportedData);
        }
      }, 1000);

      return () => clearTimeout(timeoutID);
    },
    [setSupportedCountries, isSuccess]
  );

  useEffect(
    function () {
      if (supportedCountries.length > 0) {
        inputRef.current.focus();
        const timeoutID = setTimeout(
          () =>
            setFilteredCountries(
              countries.filter((country) =>
                country.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) || countries
            ),
          500
        );

        return () => clearTimeout(timeoutID);
      }
    },
    [searchTerm, setFilteredCountries, supportedCountries]
  );

  let content;

  if (!supportedCountries.length) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <div className="px-0 md:px-80 mt-5">
          <Input
            input={{
              ref: inputRef,
              type: "text",
              name: "country",
              placeholder: "Search for country",
              value: searchTerm,
              onChange: (event) =>
                currencyCtx.handleSearchTerm(event.target.value),
            }}
          />
        </div>
        <ul className="my-6">
          {filteredCountries
            ? filteredCountries.map((country) => (
                <Country
                  key={country.name}
                  country={country}
                  checkSupported={supportedCountries}
                />
              ))
            : null}
        </ul>
      </>
    );
  }

  return (
    <Container
      className="absolute top-24 left-[15px] right-[15px] min-h-screen border-t-2
         border-orange-900 bg-zinc-50 py-6 px-8 z-20"
    >
      {content}
    </Container>
  );
}
