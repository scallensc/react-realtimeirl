import createServiceFactory from '@mapbox/mapbox-sdk/services/geocoding';

import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';
import keyStore from '@store/keyStore';

const { shortLocation } = flagStore.get()
const { mapboxKey } = keyStore.get()

interface MapboxFeature {
  place_name: string;
  place_type: string[];
  properties: Record<string, any>; //eslint-disable-line
  text: string;
}

interface MapboxResponse {
  body: {
    features: MapboxFeature[];
  };
}

const handleNeighbourhood = () => {
  const mbxGeocode = createServiceFactory({ accessToken: mapboxKey });

  const getNeighbourhood = () => {
    const { location } = globalStore.get()
    mbxGeocode
      .reverseGeocode({
        query: [location.longitude, location.latitude],
      })
      .send()
      .then((response: MapboxResponse) => {
        const context: { [key: string]: MapboxFeature } = {};
        for (const param of [
          'country',
          'region',
          'postcode',
          'district',
          'place',
          'locality',
          'neighborhood',
          'address',
          'poi',
        ]) {
          context[param] = response.body.features.find(
            (feature) => feature.place_type.includes(param)
          )!;
        }
        context['japan'] = response.body.features.find(
          (feature) => feature.place_name.includes('Japan')
        )!;

        const { country, region, place, locality, neighborhood, poi, japan } = context;

        if (!shortLocation && japan && region && place && locality) {
          globalStore.neighbourhood.set(
            poi ? `${poi.text}, ${locality.text}, ${place.text} - ${region.text}, ${country.properties.short_code.toUpperCase()}` : `${locality.text}, ${place.text} - ${region.text}, ${country.properties.short_code.toUpperCase()}`
          )
        }
        else if (!shortLocation && locality && country && !neighborhood) {
          globalStore.neighbourhood.set(
            poi ? `${poi.text}, ${locality.text}, ${country.properties.short_code.toUpperCase()}` : `${locality.text} - ${country.properties.short_code.toUpperCase()}`,
          )
        }
        else if (!shortLocation && neighborhood && locality && place) {
          globalStore.neighbourhood.set(
            poi ? `${poi.text}, ${neighborhood.text}, ${locality.text} - ${place.text}, ${country.properties.short_code.toUpperCase()}` : `${neighborhood.text}, ${locality.text} - ${place.text}, ${country.properties.short_code.toUpperCase()}`
          )
        }
        else if (!shortLocation && place) {
          globalStore.neighbourhood.set(
            poi ? `${poi.text}, ${place.text}, ${country.properties.short_code.toUpperCase()}` : `${place.text}, ${country.properties.short_code.toUpperCase()}`
          )
        }
        else if (!shortLocation && country && !place) {
          globalStore.neighbourhood.set(
            poi ? `${poi.text}, ${country.place_name}` : `${country.place_name}`
          )
        }
        else if (shortLocation) {
          globalStore.neighbourhood.set(
            `${region!.place_name}`
          )
        }
        globalStore.geocode.set(
          { ...response.body }
        )
      })
      .catch((error: Error) => {
        console.error('Error fetching neighborhood data:', error);
      });
  };
  // Get neighbourhood data from mapbox every 10 seconds
  setInterval(() => {
    getNeighbourhood();
  }, 10000);
};

handleNeighbourhood();