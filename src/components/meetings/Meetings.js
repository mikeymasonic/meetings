import React from 'react';
import styles from './Meetings.css';
import Meeting from './Meeting';

export default function Meetings({ meetings, search, filter }) {
  const meetingElements = meetings
    .sort((a, b) => a.name > b.name ? 1 : -1)
    .filter(meeting => !(filter && meeting.participants.length === 0))
    .map(meeting => (
      <li key={meeting._id}>
        <Meeting meeting={meeting} search={search} />
      </li>
    ));

  return (
    <ul className={styles.Meetings}>
      {meetingElements}
    </ul>
  );
}
