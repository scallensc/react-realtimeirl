import StateContextProvider from 'Contexts/StateContext';

import Map from 'Components/Map/Map';
import Metrics from 'Components/Metrics/Metrics';
import Neighbourhood from 'Components/Neighbourhood/Neighbourhood';
import Weather from 'Components/Weather/Weather';

import './App.scss';

function App() {
  return (
    <StateContextProvider>
      <Map />
      <Metrics />
      <Neighbourhood />
      <Weather />
    </StateContextProvider>
  );
}

export default App;
