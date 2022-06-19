import { stateContext } from 'Contexts/StateContext';
import { useContext, useEffect, useState } from 'react';

import './Metrics.scss';

const queryParams: { [Value: string]: any } = new URLSearchParams(window.location.search); // prettier-ignore
const heartrate = parseInt(queryParams.get('heartrate'));
const altitude = parseInt(queryParams.get('altitude'));
const speed = parseInt(queryParams.get('speed'));
const distance = parseInt(queryParams.get('distance'));
const heading = parseInt(queryParams.get('heading'));
const metrics = parseInt(queryParams.get('metrics'));

// prettier-ignore
const OtherMetrics = () => {
  const [speedPad, setSpeedPad] = useState(false);
  useEffect(() => {
    if (heading || distance) {
      setSpeedPad(true);
    }
    // eslint-disable-next-line
  }, [])
  const [state] = useContext(stateContext);
  return (
    <div className="other-container" style={{display:metrics ? '' : 'none'}}>
      <div className="heart-text" style={{display:heartrate ? '' : 'none'}}>{state.heartRate === 0 ? `Heartrate: ${state.heartRate} bpm` : ''}</div>
      <div className="altitude-text" style={{display:altitude ? '' : 'none'}}>Altitude: {state.imperial ? `${(Math.abs((state.altitude['EGM96'] - state.altitude['WGS84']) / 2 ) * 3.281).toFixed(0)} ft` : `${Math.abs((state.altitude['EGM96'] - state.altitude['WGS84']) / 2 ).toFixed(0)} m`}</div>
      <div className="speed-text" style={{display:speed ? '' : 'none', paddingBottom: speedPad ? '20px' : ''}}>Speed: {state.imperial ? `${(state.speed / 1.609).toFixed()} mp/h` : `${(state.speed).toFixed()} km/h`}</div>
      <div className="distance-text" style={{display:distance ? '' : 'none'}}>{state.imperial ? `Total distance: ${(state.totalDistance / 1.609).toFixed(2)} mi` : `Total distance: ${(state.totalDistance).toFixed(2)} km`}</div>
      <div className="heading-text" style={{display:heading ? '' : 'none'}}>Heading: {state.headingCardinal} - {`${state.headingDegrees.toFixed()}°`}</div>
    </div>
  );
};

export default OtherMetrics;
