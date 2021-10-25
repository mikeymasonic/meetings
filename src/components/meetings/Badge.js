import React from 'react';
import styles from './Badge.css';

export default function Badge({ total }) {
  return (
    <span className={styles.Badge}>{total}</span>
  );
}

