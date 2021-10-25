import React, { useState } from 'react';
import { useSocketSelector, useSocketDispatch } from 'react-socket-io-hooks';
import Switch from 'react-input-switch';
import Meetings from './Meetings';
import styles from './MeetingPage.css';

const selectMeetings = search => ({ meetings }) => {
  if(!search) return meetings;

  return meetings
    .filter(meeting =>
      meeting.participants
        .some(participant => participant.name.toLowerCase().includes(search.toLowerCase())));
};

const switchStyles = {
  container: {
    height: '28px',
    width: '60px',
  },
  track: {
    backgroundColor: 'gray',
  },
  trackChecked: {
    backgroundColor: 'salmon',
  },
  button: {
    backgroundColor: 'white',
    width: '30px'
  },
  buttonChecked: {
    backgroundColor: 'brown',
    left: '28px'
  }
};

const MeetingPage = () => {
  const [search, setSearch] = useState('');
  const [filterEmpty, setFilterEmpty] = useState(false);
  const dispatch = useSocketDispatch();
  const meetings = useSocketSelector(selectMeetings(search));

  const clearApiKey = () => {
    localStorage.removeItem('apiKey');
    window.history.replaceState(null, '', '/');
    dispatch({ type: 'API_KEY', payload: null });
  };

  return (
    <div className={styles.MeetingPage}>
      <button onClick={clearApiKey}>Clear API key</button>
      <input type="text" value={search} onChange={({ target }) => setSearch(target.value)} placeholder="Who are you looking for?" />
      <span className="toggle">
        <Switch styles={switchStyles} on={true} off={false} value={filterEmpty} onChange={() => setFilterEmpty(filterEmpty => !filterEmpty)} />
        Hide empty rooms
      </span>
      <Meetings meetings={meetings} search={search} filter={filterEmpty} />
    </div>
  );
};

export default MeetingPage;
