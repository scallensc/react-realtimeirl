import { observable } from "@legendapp/state";

const queryParams = new URLSearchParams(window.location.search);

const mapboxKey = import.meta.env.VITE_MAPBOX_KEY || queryParams.get('mapboxKey') || '';
const pullKey = import.meta.env.VITE_PULL_KEY || queryParams.get('pullKey') || '';
const stadiaProviderKey = import.meta.env.VITE_STADIA_PROVIDER_KEY || queryParams.get('stadiaProviderKey') || '';
const streamElementsKey = import.meta.env.VITE_STREAMELEMENTS_KEY || queryParams.get('streamElementsKey') || '';
const timezoneKey = import.meta.env.VITE_TIMEZONE_KEY || queryParams.get('timezoneKey') || '';
const weatherKey = import.meta.env.VITE_OPENWEATHER_KEY || queryParams.get('weatherKey') || '';

const keyStore = observable({
  mapboxKey: mapboxKey,
  pullKey: pullKey,
  stadiaProviderKey: stadiaProviderKey,
  streamElementsKey: streamElementsKey,
  streamElementsChannel: '',
  timezoneKey: timezoneKey,
  weatherKey: weatherKey,
});

export default keyStore;