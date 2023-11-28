import axios from 'axios';
import { io } from 'socket.io-client';

import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';
import keyStore from '@store/keyStore';

const baseUrl = 'https://api.streamelements.com/kappa/v2/sessions';

const handleStreamElements = () => {
  const { streamElementsSubscribed } = flagStore.get();
  const { streamElementsKey } = keyStore.get();

  //* Initial fetch for streamelements data
  const fetchData = async () => {
    const { streamElementsChannel } = keyStore.get()
    const data = await axios.get(`${baseUrl}/${streamElementsChannel}`, { headers: { Authorization: `Bearer ${streamElementsKey}` } });
    globalStore.streamElements.set(data.data.data);
  };

  //* Subscribe to streamelements websocket using socket.io
  const subStreamElements = async () => {
    const JWT = streamElementsKey;
    const socket = io('https://realtime.streamelements.com', {
      transports: ['websocket'],
      autoConnect: true,
    });
    // Socket connected
    socket.on('connect', () => {
      socket.emit('authenticate', {
        method: 'jwt',
        token: JWT,
      });
    });
    socket.on('authenticated', (data) => {
      const { channelId } = data;
      keyStore.streamElementsChannel.set(channelId);
      flagStore.streamElementsSubscribed.set(true);
      fetchData();
    });
    socket.on('connect_error', (err: Error) => {
      console.log('connection error', err);
    });
    socket.on('disconnect', (reason: string) => {
      console.log('disconnected', reason);
    });
    socket.on('error', (err: Error) => {
      socket.close();
      console.log('socket error', err);
    });

    /**
     * StreamElements documentation sucks, since the last update to this overlay, 
     * the socket API is returning data in a different shape and the changes to 
     * this have not been documented correctly at all.
     * 
     * As such, I'm just retriggering the initial fetch function to the HTTP based API, 
     * which grabs the entire channel data and chucking it into the store again.
     */
    socket.on('event', () => { fetchData() })
  };

  if (streamElementsKey && !streamElementsSubscribed) {
    subStreamElements();
  }
};

handleStreamElements();