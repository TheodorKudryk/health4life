import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Main.module.css';
export function Main() {
    return(
        <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
        >
          -
        </button>
        <button
          className={styles.button}
          aria-label="Increment value"
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
        />
        <button
          className={styles.button}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
        >
          Add Async
        </button>
        <button
          className={styles.button}
        >
          Add If Odd
        </button>
      </div>
    </div>
    )
}