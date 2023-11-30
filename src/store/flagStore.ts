import { observable } from "@legendapp/state";

const queryParams = new URLSearchParams(window.location.search);

const getQueryParamFlag = (key) => {
  return queryParams.has(key.toLowerCase()) || queryParams.has(key.toUpperCase()) || queryParams.has(key);
};

const parseZoomLevels = (zoomLevelsString) => {
  return zoomLevelsString.split(',').filter(pair => pair.includes('-'));
};

const flagStore = observable({
  disableAnimation: getQueryParamFlag('disableAnimation'),
  hideMap: getQueryParamFlag('hideMap'),
  hideTime: getQueryParamFlag('hideTime'),
  mapFollowsHeading: getQueryParamFlag('mapFollowsHeading'),
  mapHasBorder: getQueryParamFlag('mapHasBorder'),
  mapIs3d: getQueryParamFlag('mapIs3d'),
  mapIsCircular: getQueryParamFlag('mapIsCircular'),
  mapZoom: queryParams.get('mapZoom') || '15',
  pulseMarker: getQueryParamFlag('pulseMarker'),
  shortLocation: getQueryParamFlag('shortLocation'),
  showAltitude: getQueryParamFlag('showAltitude'),
  showDistance: getQueryParamFlag('showDistance'),
  showHeading: getQueryParamFlag('showHeading'),
  showHeartrate: getQueryParamFlag('showHeartrate'),
  showMetrics: getQueryParamFlag('showMetrics'),
  showSpeed: getQueryParamFlag('showSpeed'),
  splitDateTime: getQueryParamFlag('splitDateTime'),
  streamElementsSubscribed: false,
  theme: queryParams.get('theme') || 'mapbox://styles/mapbox/streets-v12',
  timeAtBottom: getQueryParamFlag('timeAtBottom'),
  useImperial: getQueryParamFlag('useImperial'),
  zoomLevels: queryParams.get('zoomLevels') || '',
  zoomLevelPairs: parseZoomLevels(queryParams.get('zoomLevels') || ''),
});

export default flagStore;
