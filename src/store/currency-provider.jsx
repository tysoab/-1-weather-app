import { useEffect, useReducer } from "react";
import CurrencyContext from "./currency-context";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../util/http";

export const initialState = {
  toggle: { from: false, to: false },
  from: "",
  to: "",
  searchTerm: "",
  amount: 0,
  result: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "setCountries":
      return { ...state, countries: action.payload };
    case "toggle":
      return {
        ...state,
        toggle: {
          ...state.toggle,
          from: action.payload === "from" ? true : false,
          to: action.payload === "to" ? true : false,
        },
        amount: 0,
        result: 0,
      };
    case "search":
      return { ...state, searchTerm: action.payload };
    case "searchCountry":
      return {
        ...state,
        from: state.toggle.from ? action.payload : state.from,
        to: state.toggle.to ? action.payload : state.to,
        toggle: { from: false, to: false },
        searchTerm: "",
      };
    case "amount":
      return { ...state, amount: action.payload };
    case "convert":
      return { ...state, result: action.payload };
    default:
      throw new Error("Action unknown");
  }
}

export default function CurrenceyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["countries"],
    queryFn: ({ signal, type }) =>
      fetchCountries({ signal, type: "getCountry" }),
    staleTime: 5000,
  });

  const countries = data
    ? data.map((country) => {
        let currency;
        for (let key in country.currencies) {
          currency = key;
        }

        return {
          currency,
          continents: country.continents,
          name: country.name.common,
          flag: country.flags[1],
        };
      })
    : [];

  useEffect(
    function () {
      dispatch({ type: "setCountries", payload: countries });
    },
    [data, dispatch]
  );

  function handleFromTo(opt) {
    dispatch({ type: "toggle", payload: opt });
  }

  function handleSearchTerm(searchTerm) {
    dispatch({ type: "search", payload: searchTerm });
  }

  function handleSearchCountry(formData) {
    dispatch({ type: "searchCountry", payload: formData });
  }

  function handleAmount(amount) {
    dispatch({ type: "amount", payload: amount });
  }

  function handleConversion(rate) {
    dispatch({ type: "convert", payload: rate });
  }

  const contextValue = {
    ...state,
    isLoading,
    isSuccess,
    handleFromTo,
    handleSearchTerm,
    handleSearchCountry,
    handleAmount,
    handleConversion,
  };
  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}
