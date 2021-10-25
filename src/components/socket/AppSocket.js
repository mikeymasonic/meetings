import React from 'react';
import { SocketProvider } from 'react-socket-io-hooks';

const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case 'MEETINGS':
      return action.payload;
    case 'MEETING_UPDATED':
      return state.reduce((meetings, meeting) => {
        if(meeting.zoomId !== action.payload.zoomId) meetings.push(meeting);
        return meetings;
      }, [action.payload]);
    default:
      return state;
  }
};

const AppSocket = ({ apiKey, children }) => {
  const socketOpts = {
    transportOptions: {
      polling: {
        extraHeaders: {
          'X-API-KEY': apiKey 
        }
      }
    }
  };
  
  return (
    <SocketProvider
      uri="http://localhost:7890"
      reducer={reducer}
      socketOpts={socketOpts}
      initialState={[]}>
      {children}
    </SocketProvider>
  );
};

export default AppSocket;
