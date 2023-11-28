import * as luxon from 'luxon';
import { when } from '@legendapp/state';

import globalStore from '@store/globalStore';
import keyStore from '@store/keyStore';

const { timezoneKey } = keyStore.get();

/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
const handleDateTime = async () => {

  while (true) {
    try {
      const { location } = globalStore.get()
      const response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneKey}&format=json&by=position&lat=${location.latitude}&lng=${location.longitude}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      globalStore.set((prevData => ({ ...prevData, zoneId: data.zoneName })))
      await new Promise(resolve => setTimeout(resolve, 10000)); // Refresh interval
    } catch (error) {
      console.error('Error fetching time zone, retrying:', error);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Retry on error interval
    }
  }
};

const lang = 'en';
const date = 'ccc, MMM dd, yyyy';
const time = 'HH:mm:ss';
const datetime = 'ccc, MMM dd, yyyy | HH:mm:ss';

setInterval(() => {
  globalStore.time.set(luxon.DateTime.now().setZone(globalStore.zoneId.get()).setLocale(lang).toFormat(time));
  globalStore.date.set(luxon.DateTime.now().setZone(globalStore.zoneId.get()).setLocale(lang).toFormat(date));
  globalStore.dateTime.set(luxon.DateTime.now().setZone(globalStore.zoneId.get()).setLocale(lang).toFormat(datetime));
}, 1000);

when(
  () => globalStore.location.latitude.get() && globalStore.location.longitude.get(),
  () => handleDateTime()
);