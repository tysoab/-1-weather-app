import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import CurrenceyProvider from "./store/currency-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <CurrenceyProvider>
      <App />
    </CurrenceyProvider>
  </QueryClientProvider>
);
