import { Suspense } from 'react';
import { SvgLoader } from 'react-svgmt';

import valueFormatter from '@functions/valueFormatter';

import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';

import './Weather.scss';

const Weather = () => {
  const { useImperial } = flagStore.get();
  const { locationData } = globalStore.get();

  const icon = `assets/${locationData?.weather?.[0]?.icon}.svg`;
  const max = `assets/cloud-arrow-up.svg`
  const min = `assets/cloud-arrow-down.svg`

  const feels_like = valueFormatter('temperature', locationData.main.feels_like)
  const temp = valueFormatter('temperature', locationData.main.temp)
  const temp_max = valueFormatter('temperature', locationData.main.temp_max)
  const temp_min = valueFormatter('temperature', locationData.main.temp_min)

  return (
    <Suspense fallback={<div />}>
      <div className="weather-container">
        <div className="conditions">
          {locationData.weather[0].main} /{' '}
          {locationData.weather[0].description}
        </div>
        <div className="min-max">
          <div className="icon-container">
            <div className="icon-main">
              <SvgLoader path={icon} fill="white" stroke="black" strokeWidth="8px" />
            </div>
          </div>
          <br />
          <div className="icon-container">
            <div className="icon">
              <SvgLoader path={min} fill="white" stroke="black" strokeWidth="12px" />
            </div>
            <div className="text">
              &nbsp;
              {useImperial ? temp_min.imperial : temp_min.metric}
              &nbsp;-&nbsp;
            </div>
          </div>
          <div className="icon-container">
            <div className="icon">
              <SvgLoader path={max} fill="white" stroke="black" strokeWidth="12px" />
            </div>
            <div className="text">
              &nbsp;
              {useImperial ? temp_max.imperial : temp_max.metric}
            </div>
          </div>
        </div>
        <div className="current-weather">
          Current: {useImperial ? temp.imperial : temp.metric}
          <br />
          Feels like: {useImperial ? feels_like.imperial : feels_like.metric}
        </div>
      </div>
    </Suspense>
  );
};

export default Weather;
