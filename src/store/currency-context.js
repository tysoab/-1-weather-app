import { createContext } from "react";

const CurrencyContext = createContext({
  toggle: { from: false, to: false },
  countries: [],
  searchTerm: null,
  amount: 0,
  result: 0,
  handleFromTo: () => {},
  handleSearchTerm: () => {},
  handleSearchCountry: () => {},
  handleAmount: () => {},
});

export default CurrencyContext;
