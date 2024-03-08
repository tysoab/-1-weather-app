export async function fetchCountryWeather(query) {
  if (!query) return;

  const fetchedData = {
    error: "",
    isLoading: false,
  };

  try {
    fetchedData.isLoading = true;
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=cd57794ff3ee4a6ea8b145748240603&q=${query}&aqi=no`
    );
    if (!res.ok) throw new Error("No result found!");

    fetchedData.data = await res.json();
    fetchedData.isLoading = false;
  } catch (err) {
    fetchedData.error = err.message;
    fetchedData.isLoading = false;
  }

  return fetchedData;
}

export async function defaultCountries() {
  const countries = {
    london: await fetchCountryWeather("london"),
    newyork: await fetchCountryWeather("new york"),
    berlin: await fetchCountryWeather("berlin"),
    paris: await fetchCountryWeather("paris"),
    abuja: await fetchCountryWeather("abuja"),
    beijing: await fetchCountryWeather("beijing"),
  };
  return countries;
}
