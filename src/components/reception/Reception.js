import React, { useState, useEffect } from 'react';
import { useEmitEvent, useSocket } from 'react-socket-io-hooks';

const getApiKey = () => {
  const search = new URLSearchParams(window.location.search);
  return search.get('apiKey') || localStorage.getItem('apiKey') || '';
};

const Reception = () => {
  const socket = useSocket();
  const emitApiKey = useEmitEvent('API_KEY');
  const [apiKey, setApiKey] = useState(getApiKey());

  useEffect(() => {
    if(apiKey && socket.connected !== undefined) emitApiKey(apiKey);
    apiKey && socket.on && socket.on('reconnect', () => emitApiKey(apiKey));
  }, [socket.connected]);

  const setAndEmitApiKey = key => {
    localStorage.setItem('apiKey', key);
    setApiKey(key);
    emitApiKey(key);
    window.history.replaceState(null, '', `?apiKey=${key}`);
  };

  return (
    <input type="text" value={apiKey} onChange={({ target }) => setAndEmitApiKey(target.value)} placeholder="API_KEY" />
  );
};

export default Reception;
