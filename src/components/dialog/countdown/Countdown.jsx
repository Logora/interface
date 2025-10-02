import React, { useEffect, useState } from "react";

const getTimeLeftString = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;
    if (diff <= 0) {
        return "0:00:00";
    } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
};

export const Countdown = ({ expiresAt }) => {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeftString(expiresAt));

    useEffect(() => {
        setTimeLeft(getTimeLeftString(expiresAt));
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeftString(expiresAt));
        }, 1000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    return <span style={{ marginLeft: 8 }}>{timeLeft}</span>;
};
