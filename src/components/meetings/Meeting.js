import React from 'react';
import styles from './Meeting.css';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Badge from './Badge';

const found = (name, search) => search && name.toLowerCase().includes(search.toLowerCase());

export default function Meeting({ meeting, search }) {
  const totalParticipants = meeting.participants.length;
  return (
    <section className={styles.Meeting}>
      <h2>
        <a href={meeting.joinUrl} rel="noopener noreferrer" target="_blank">
          <Badge total={totalParticipants} />
          <FaExternalLinkAlt />
          {meeting.name}
        </a>
      </h2>
      <ul>
        {meeting.participants.map(participant => (
          <li key={participant._id} className={found(participant.name, search) ? styles.found : ''}>{participant.name}</li>
        ))}
      </ul>
    </section>
  );
}
