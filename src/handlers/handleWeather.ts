import { when } from "@legendapp/state";

import globalStore from "@store/globalStore";
import keyStore from "@store/keyStore";

const { weatherKey } = keyStore.get();

/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
const handleWeather = async () => {
  while (true) {
    try {
      const { location } = globalStore.get();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${weatherKey}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      globalStore.locationData.set(data)
      await new Promise(resolve => setTimeout(resolve, 10000)); // Refresh interval
    } catch (error) {
      console.error('Error fetching weather, retrying:', error);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Retry on error interval
    }
  }
};

when(
  () => globalStore.location.latitude.get() && globalStore.location.longitude.get(),
  () => handleWeather()
);