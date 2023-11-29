import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchCountries({ signal, type }) {
  const url =
    type === "getCountry"
      ? "https://restcountries.com/v3/all"
      : type === "supported"
      ? "https://api.frankfurter.app/latest"
      : null;
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the countries");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const countries = await response.json();

  return countries;
}

export async function convertCurrency(formData) {
  const { amount, from, to } = formData;
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );

    if (!response.ok) {
      const error = new Error("An error occurred");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}
