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

let position;
navigator.geolocation.getCurrentPosition(
  (pos) => (position = pos),
  (reject) => reject
);

// getLocation();
export async function fetchUserLocation() {
  if (position.coords) {
    const { latitude: lat, longitude: lon } = position.coords;
    const res = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=65eb7095899e7858423663wyu49f2ed`
    );

    if (!res.ok) return;
    const data = await res.json();
    if (!data) return;
    const locationData = await fetchCountryWeather(
      `${data.address.state} ${data.address.country}`
    );
    return locationData;
  }
}
