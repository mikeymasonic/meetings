import React from 'react';
import { render } from 'react-dom';
import { SocketProvider } from 'react-socket-io-hooks';
import App from './components/App';

const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case 'API_KEY':
      return {
        ...state,
        title: action.payload?.title,
        auth: !!action.payload,
        meetings: action.payload?.meetings || [],
        admin: action.payload?.admin || false
      };
    case 'MEETING_UPDATED':
      return {
        ...state,
        meetings: state.meetings.reduce((meetings, meeting) => {
          if(meeting.zoomId !== action.payload.zoomId) meetings.push(meeting);
          return meetings;
        }, [action.payload])
      };
    default:
      return state;
  }
};

render(
  <SocketProvider
    uri={process.env.SOCKET_URI}
    reducer={reducer}
    initialState={{ meetings: [], auth: false }}>
    <App />
  </SocketProvider>,
  document.getElementById('root')
);
