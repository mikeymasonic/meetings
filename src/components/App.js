import React from 'react';
import { useSocketState } from 'react-socket-io-hooks';
import MeetingPage from './meetings/MeetingPage';
import Reception from './reception/Reception';

export default function App() {
  const { title, auth } = useSocketState();

  return (
    <>
      <h1>Alchemy Meeting Rooms{title ? ` - ${title}` : ''}</h1>
      {!auth && <Reception />}
      {auth && <MeetingPage />}
    </>
  );
}
  
