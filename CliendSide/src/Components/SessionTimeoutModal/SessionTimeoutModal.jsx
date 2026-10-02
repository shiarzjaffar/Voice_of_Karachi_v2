import React from "react";
import styles from "./SessionTimeoutModal.module.css";

const SessionTimeoutModal = ({
  countdown,
  onContinue,
  onLogout,
}) => {
  const minutes = Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (countdown % 60)
    .toString()
    .padStart(2, "0");

  const timerClass =
    countdown <= 10
      ? styles.danger
      : countdown <= 20
      ? styles.warning
      : styles.normal;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-timeout-title"
    >
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <span>⚠️</span>
        </div>

        <h2 id="session-timeout-title">
          Session Expiring
        </h2>

        <p className={styles.message}>
          You have been inactive for 15 minutes.
        </p>

        <p className={styles.securityMessage}>
          For your security, your account will be
          automatically signed out.
        </p>

        <div className={styles.countdownLabel}>
          Logging out in
        </div>

        <div className={`${styles.countdown} ${timerClass}`}>
          {minutes}:{seconds}
        </div>

        <div className={styles.divider} />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.continueButton}
            onClick={onContinue}
            autoFocus
          >
            Continue Session
          </button>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;