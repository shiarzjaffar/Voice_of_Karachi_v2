import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useIdleLogout(timeout = 60 * 1000) {

    const timer = useRef(null);

    const navigate = useNavigate();

    const { loggedIn, logout } = useAuth();

    useEffect(() => {

        if (!loggedIn) return;

        const resetTimer = () => {

            clearTimeout(timer.current);

            timer.current = setTimeout(async () => {

                alert("You have been logged out due to inactivity.");

                await logout();

                navigate("/login", { replace: true });

            }, timeout);

        };

        const events = [
            "mousemove",
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
        ];

        events.forEach(event =>
            window.addEventListener(event, resetTimer)
        );

        resetTimer();

        return () => {

            clearTimeout(timer.current);

            events.forEach(event =>
                window.removeEventListener(event, resetTimer)
            );

        };

    }, [loggedIn, logout, navigate, timeout]);

}