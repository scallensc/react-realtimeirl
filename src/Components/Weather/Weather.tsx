import { stateContext } from 'Contexts/StateContext';
import React, { useContext, useEffect, useState } from 'react';

import { Transition } from 'react-transition-group';
import { useSpring, animated } from 'react-spring';

//@ts-ignore
import { SvgLoader } from 'react-svgmt';

import isEmpty from 'Functions/isEmpty';

import './Weather.scss';

//prettier-ignore
const Weather = () => {
  const [state] = useContext(stateContext);
  const [show, setShow] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [counter, setCounter] = useState(0)
  const [pendingVisible, setPendingVisible] = useState(false);

  const icon = `assets/${state?.locationData?.weather?.[0]?.icon}.svg`;
  const max = `assets/cloud-arrow-up.svg`
  const min = `assets/cloud-arrow-down.svg`

  const springConfig = { mass: 4, tension: 400, friction: 80, velocity: 10 };
  const weatherProps = useSpring({
    config: springConfig,
    transform: show ? `translate(0px, 0px)` : `translate(400px, 0px)`,
    from: { 
      transform: show ? 'translate(400px, 0px)' : 'translate(0px, 0px)',
    },
  })

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0);
    }
    if (!timeLeft) return;
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 10) {
      setCounter(0);
    } else if (timeLeft <= 10 && timeLeft > 5) {
      setCounter(1);
    } else {
      setCounter(2);
    }
  }, [timeLeft, counter]);

  useEffect(() => {
    if (
      !pendingVisible
    ) {
      if (!timeLeft && !pendingVisible) {
        setPendingVisible(true);
        setTimeLeft(30);
      }
    }
  }, [pendingVisible, timeLeft]);

  useEffect(() => {
    if (pendingVisible && !timeLeft) {
      setPendingVisible(true);
      setShow(true);
      setTimeLeft(15);
    }
  }, [pendingVisible, timeLeft]);

  useEffect(() => {
    if (
      pendingVisible &&
      show &&
      !timeLeft
    ) {
      setPendingVisible(false);
      setShow(false);
      setTimeLeft(0);
    }
  }, [pendingVisible, show, timeLeft]);

  return (
    <React.Suspense fallback={<div/>}>
      {!isEmpty(state.locationData) && (
      <Transition timeout={1000} mountOnEnter unmountOnExit in={show}>
      <animated.div className="weather-container" style={weatherProps}>
        <div className="conditions">
          {state.locationData.weather[0].main} /{' '}
          {state.locationData.weather[0].description}
        </div>
          <div className="min-max">
          <div className="weather-icon">
            <SvgLoader
              path={icon}
              className="icon"
              fill="white"
              stroke="black"
              strokeWidth="8px"
            />
            <br />
          </div>
            <br />
            <div className="min-icon">
            <SvgLoader 
            path={min}
            className="icon"
            fill="white"
            stroke="black"
            strokeWidth="12px"
            />
            </div>
            &nbsp;
            {state.imperial ? `${(((state.locationData.main.temp_min - 273.15) * 9 / 5 ) + 32).toFixed(1)} °F ` : `${(state.locationData.main.temp_min - 273.15).toFixed(1)} °C `}
            -&nbsp;
            <div className="max-icon">
            <SvgLoader 
            path={max}
            className="icon"
            fill="white"
            stroke="black"
            strokeWidth="12px"
            />
            </div>
            &nbsp;
            {state.imperial ? `${(((state.locationData.main.temp_max - 273.15) * 9 / 5 ) + 32).toFixed(1)} °F` : `${(state.locationData.main.temp_max - 273.15).toFixed(1)} °C`}
          </div>
          <div className="current-weather">
            Current: {state.imperial ? `${(((state.locationData.main.temp - 273.15) * 9 / 5 ) + 32).toFixed(1)} °F` : `${(state.locationData.main.temp - 273.15).toFixed(1)} °C`}
            <br />
            Feels like: {state.imperial ? `${(((state.locationData.main.feels_like - 273.15) * 9 / 5 ) + 32).toFixed(1)} °F` : `${(state.locationData.main.feels_like - 273.15).toFixed(1)} °C`}
        </div>
      </animated.div>
      </Transition>)}
      </React.Suspense>
  );
};

export default Weather;
