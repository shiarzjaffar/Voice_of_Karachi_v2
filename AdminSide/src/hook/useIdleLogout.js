import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_TIMEOUT = 15 * 60 * 1000;
const WARNING_TIME = 60;

export default function useIdleLogout() {
  const navigate = useNavigate();

  const idleTimer = useRef(null);
  const countdownTimer = useRef(null);
  const warningRef = useRef(false);

  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_TIME);

  const clearTimers = () => {
    clearTimeout(idleTimer.current);
    clearInterval(countdownTimer.current);

    idleTimer.current = null;
    countdownTimer.current = null;
  };

  const performLogout = async () => {
    clearTimers();

    warningRef.current = false;
    setShowWarning(false);

    try {
      await fetch(
        "http://localhost:5000/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (err) {
      console.error("Admin logout error:", err);
    }

    navigate("/", { replace: true });
  };

  const startWarningCountdown = () => {
    clearInterval(countdownTimer.current);

    setCountdown(WARNING_TIME);

    countdownTimer.current = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(countdownTimer.current);
          countdownTimer.current = null;

          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  };

  const startIdleTimer = () => {
    clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => {
      warningRef.current = true;

      setShowWarning(true);

      startWarningCountdown();
    }, IDLE_TIMEOUT);
  };

  const resetIdleTimer = () => {
    if (warningRef.current) {
      return;
    }

    startIdleTimer();
  };

  const continueSession = () => {
    clearTimers();

    warningRef.current = false;

    setCountdown(WARNING_TIME);
    setShowWarning(false);

    startIdleTimer();
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    startIdleTimer();

    return () => {
      clearTimers();

      events.forEach((event) => {
        window.removeEventListener(
          event,
          resetIdleTimer
        );
      });
    };
  }, []);

  useEffect(() => {
    if (countdown === 0 && showWarning) {
      performLogout();
    }
  }, [countdown, showWarning]);

  return {
    showWarning,
    countdown,
    continueSession,
    logoutNow: performLogout,
  };
}