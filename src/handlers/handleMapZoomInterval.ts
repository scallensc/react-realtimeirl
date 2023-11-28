import flagStore from "@store/flagStore";

const { zoomLevelPairs } = flagStore.get();

const intervals = zoomLevelPairs.map(pair => {
  const [mapZoom, intervalTime] = pair.split('-').map(Number);
  return { mapZoom, intervalTime };
});

/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
const handleMapZoomInterval = async () => {
  // Abort if no intervals are specified
  if (!Array.isArray(intervals) || intervals.length === 0) {
    return;
  }

  // Abort if any interval pairs are invalid
  if (intervals.some(interval => typeof interval.mapZoom !== 'number' || typeof interval.intervalTime !== 'number')) {
    return;
  }

  let index = 0;
  while (true) {
    try {
      flagStore.mapZoom.set(intervals[index].mapZoom.toString());
      await new Promise(resolve => setTimeout(resolve, (intervals[index].intervalTime * 60000)));
      index = (index + 1) % intervals.length;
    } catch (error) {
      console.error('Error setting map zoom:', error);
    }
  }
};

handleMapZoomInterval();