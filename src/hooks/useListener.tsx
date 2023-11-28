import { useEffect } from 'react';
import { forPullKey } from '@rtirl/api';

import globalStore from '@store/globalStore';
import keyStore from '@store/keyStore';

interface IListenerProps {
  altitude: { EGM96: number, WGS84: number };
  heading: number;
  location: { latitude: number, longitude: number };
  reportedAt: number;
  speed: number;
  updatedAt: number;
}

interface ISessionListenerProps {
  sessionId: string;
}

const useListener = () => {
  const { pullKey } = keyStore.get();
  useEffect(() => {
    const unsubscribeListener = forPullKey(pullKey).addListener((data: IListenerProps) => {
      globalStore.set((prevState) => ({
        ...prevState,
        altitude: data.altitude,
        heading: data.heading,
        location: data.location,
        speed: (data.speed * 3.6),
      }));
    });
    const unsubscribeSessionListener = forPullKey(pullKey).addListener((data: ISessionListenerProps) => {
      globalStore.set((prevState) => ({
        ...prevState,
        sessionId: data.sessionId,
      }));
    });
    return () => {
      unsubscribeListener()
      unsubscribeSessionListener()
    };
  });
};

export default useListener;
