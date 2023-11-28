import { useEffect } from 'react';

import Map from '@components/Map';
import Metrics from '@components/Metrics';
import Neighbourhood from '@components/Neighbourhood';
import Rotator from '@components/Rotator';

import useListener from '@hooks/useListener';

import './App.scss';

function App() {
  // Propagate events to global state
  useListener();

  // Run handlers
  useEffect(() => {
    import('@handlers/handleDateTime')
    import('@handlers/handleDistance')
    import('@handlers/handleMapZoomInterval')
    import('@handlers/handleStreamElements')
    import('@handlers/handleTheme')
    import('@handlers/handleWeather')
    import('@handlers/handleNeighbourhood')
  }, [])
  return (
    <div className="react-rtirl-container">
      <Map />
      <Metrics />
      <Neighbourhood />
      <Rotator />
    </div>
  );
}

export default App;
