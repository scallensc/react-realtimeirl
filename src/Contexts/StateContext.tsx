import { createContext, useEffect, useRef, useState } from 'react';

import * as luxon from 'luxon';
import { forPullKey } from '@rtirl/api';

//@ts-ignore
import createServiceFactory from '@mapbox/mapbox-sdk/services/geocoding';

import isEmpty from 'Functions/isEmpty';

let [pullKey, mapboxKey, mapZoom, weatherKey, timezoneKey] = [
  '',
  '',
  '',
  '',
  '',
  '',
];

const queryParams = new URLSearchParams(window.location.search);

mapboxKey = process.env.REACT_APP_MAPBOX_KEY || queryParams.get('mapboxKey') || ''; // prettier-ignore
mapZoom = queryParams.get('zoom') || '13'; // prettier-ignore
pullKey = process.env.REACT_APP_PULL_KEY || queryParams.get('pullKey') || ''; // prettier-ignore
timezoneKey = process.env.REACT_APP_TIMEZONE_KEY || queryParams.get('timezoneKey') || ''; // prettier-ignore
weatherKey = process.env.REACT_APP_OPENWEATHER_KEY || queryParams.get('weatherKey') || ''; // prettier-ignore

const imperial = queryParams.get('imperial');

const mbxGeocode = createServiceFactory({ accessToken: mapboxKey });

type Context = any;

export const stateContext = createContext<Context>({});

let sessionDistance = 0;

const StateContextProvider = (props: any) => {
  const [state, setState] = useState({
    timezoneKey: timezoneKey,
    mapboxKey: mapboxKey,
    mapZoom: mapZoom,
    pullKey: pullKey,
    weatherKey: weatherKey,
    zoneId: '',
    prevLocation: {
      latitude: 0,
      longitude: 0,
    },
    location: {
      latitude: 0,
      longitude: 0,
    },
    geocode: {},
    locationData: {},
    neighbourhood: '',
    date: '',
    time: '',
    speed: 0,
    altitude: 69,
    headingCardinal: 'NE',
    headingDegrees: 420,
    heartRate: 0,
    totalDistance: 0,
    sessionId: '',
    imperial: imperial || '',
  });

  const usePreviousLocation = (value: {
    latitude: number;
    longitude: number;
  }): any => {
    const ref = useRef({ latitude: 0, longitude: 0 });
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const usePreviousSessionId = (value: string): string => {
    const ref = useRef('');
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevLocation = usePreviousLocation(state.location);
  const prevSessionId = usePreviousSessionId(state.sessionId);

  const getNeighbourhood = () => {
    mbxGeocode
      .reverseGeocode({
        query: [state.location.longitude, state.location.latitude],
      })
      .send()
      .then((response: { [Response: string]: any }) => {
        let context: { [index: string]: any } = {};
        for (let param of [
          'country',
          'region',
          'postcode',
          'district',
          'place',
          'locality',
          'neighborhood',
          'address',
          'poi',
        ])
          context[param] = response.body!.features.find(
            (feature: { [index: string]: string }) =>
              feature.place_type.includes(param)
          );
        context['japan'] = response.body!.features.find(
          (feature: { [index: string]: string }) =>
            feature.place_name.includes('Japan')
        );
        //eslint-disable-next-line
        const { country, region, postcode, district, place, locality, neighborhood, address, poi, japan } = context; // prettier-ignore
        // prettier-ignore
        if (japan && region && place && locality) {
          setState((state) => ({
            ...state,
            neighbourhood: poi ? `${poi.text}, ${locality.text}, ${place.text} - ${region.text}, ${country.properties.short_code.toUpperCase()}` : `${locality.text}, ${place.text} - ${region.text}, ${country.properties.short_code.toUpperCase()}`
          }))
        }
        else if (locality && country && !neighborhood) {
          setState((state) => ({
            ...state,
            neighbourhood: poi ? `${poi.text}, ${locality.text}, ${country.properties.short_code.toUpperCase()}`: `${locality.text} - ${country.properties.short_code.toUpperCase()}`,
          }));
        } 
        else if (neighborhood && locality && place) {
          setState((state) => ({
            ...state,
            neighbourhood: poi ? `${poi.text}, ${neighborhood.text}, ${locality.text} - ${place.text}, ${country.properties.short_code.toUpperCase()}` : `${neighborhood.text}, ${locality.text} - ${place.text}, ${country.properties.short_code.toUpperCase()}`,
          }));
        }
        else if (place) {
          setState((state) => ({
            ...state,
            neighbourhood: poi ? `${poi.text}, ${place.text}, ${country.properties.short_code.toUpperCase()}` : `${place.text}, ${country.properties.short_code.toUpperCase()}`,
          }));
        }
        else if (country && !place) {
          setState((state) => ({
            ...state,
            neighbourhood: poi ? `${poi.text}, ${country.place_name}` : `${country.place_name}`,
          }));
        }
        setState((state) => ({ ...state, geocode: { ...response.body } }));
      });
  };

  const refreshTzOffset = () => {
    fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${state.timezoneKey}&format=json&by=position&lat=${state.location.latitude}&lng=${state.location.longitude}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState((state) => ({ ...state, zoneId: data['zoneName'] }));
      });
  };

  useEffect(() => {
    forPullKey(state.pullKey).addLocationListener((location) => {
      if (location) {
        if (
          state.location.latitude !== location.latitude ||
          state.location.longitude !== location.longitude
        ) {
          setState((state) => ({
            ...state,
            location: {
              ...location,
            },
          }));
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const mapboxInterval = setInterval(() => {
      getNeighbourhood();
    }, 5000);
    return () => {
      clearInterval(mapboxInterval);
    };
    // eslint-disable-next-line
  }, [state.location, state.neighbourhood]);

  useEffect(() => {
    if (state.location.latitude && !state.zoneId) {
      refreshTzOffset();
    }
    // eslint-disable-next-line
  }, [state.location]);

  useEffect(() => {
    const tzInterval = setInterval(() => {
      refreshTzOffset();
    }, 5000);
    return () => {
      clearInterval(tzInterval);
    };
    // eslint-disable-next-line
  }, [state.zoneId]);

  useEffect(() => {
    const lang = 'en';
    const date = 'ccc, MMM dd, yyyy | HH:mm:ss';
    if (!isEmpty(state.zoneId)) {
      const dateInterval = setInterval(() => {
        setState((state) => ({
          ...state,
          date: luxon.DateTime.now()
            .setZone(state.zoneId)
            .setLocale(lang)
            .toFormat(date),
        }));
      }, 1000);
      return () => {
        clearInterval(dateInterval);
      };
    }
    // eslint-disable-next-line
  }, [state.zoneId]);

  useEffect(() => {
    forPullKey(state.pullKey).addSpeedListener((speed) => {
      if (speed && state.speed !== speed) {
        setState((state) => ({
          ...state,
          speed: speed * 3.6,
        }));
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    forPullKey(state.pullKey).addAltitudeListener((alt: any) => {
      if (!isEmpty(alt) && state.altitude !== alt['EGM96']) {
        setState((state) => ({
          ...state,
          altitude: alt['EGM96'],
        }));
      }
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    forPullKey(state.pullKey).addHeartRateListener((rate) => {
      if (rate && state.heartRate !== rate) {
        setState((state) => ({ ...state, heartRate: rate }));
      }
    });
    //eslint-disable-next-line
  }, []);

  let compass = [
    'N - ↑',
    'NE - ↗',
    'E - →',
    'SE - ↘',
    'S - ↓',
    'SW - ↙',
    'W - ←',
    'NW - ↖',
  ];

  useEffect(() => {
    forPullKey(state.pullKey).addHeadingListener((heading) => {
      const cardinal = compass[(((heading + 22.5) % 360) / 45) | 0];
      if (
        state.headingCardinal !== cardinal ||
        state.headingDegrees !== heading
      ) {
        setState((state) => ({
          ...state,
          headingCardinal: cardinal,
          headingDegrees: heading,
        }));
      }
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.location.latitude !== 0) {
      if (isEmpty(state.locationData)) {
        fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
            state.location.latitude +
            '&lon=' +
            state.location.longitude +
            `&appid=${state.weatherKey}`
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setState((state) => ({ ...state, locationData: { ...json } }));
          });
      }
    }
  }, [state]);

  useEffect(() => {
    const locationInterval = setInterval(() => {
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
          state.location.latitude +
          '&lon=' +
          state.location.longitude +
          `&appid=${state.weatherKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setState((state) => ({ ...state, locationData: { ...json } }));
        });
    }, 5000);
    return () => {
      clearInterval(locationInterval);
    };
    // eslint-disable-next-line
  }, [state.locationData]);

  useEffect(() => {
    forPullKey(state.pullKey).addSessionIdListener((sessionId) => {
      if (sessionId && sessionId !== state.sessionId) {
        setState((state) => ({
          ...state,
          sessionId: sessionId,
        }));
      }
    });
    //eslint-disable-next-line
  }, []);

  //eslint-disable-next-line
  useEffect(() => {
    if (prevSessionId && state.sessionId) {
      if (prevSessionId !== state.sessionId) {
        setState((state) => ({ ...state, totalDistance: 0 }));
      }
    }
  });

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (
      prevLocation.latitude &&
      prevLocation.longitude &&
      state.location.latitude &&
      state.location.longitude &&
      state.sessionId
    ) {
      sessionDistance += getDistanceFromLatLonInKm(
        state.location.latitude,
        state.location.longitude,
        prevLocation.latitude,
        prevLocation.longitude
      );
    }
    if (state.totalDistance !== sessionDistance) {
      setState((state) => ({ ...state, totalDistance: sessionDistance }));
    }
  });

  return (
    <stateContext.Provider value={[state, setState]}>
      {props.children}
    </stateContext.Provider>
  );
};

export default StateContextProvider;
