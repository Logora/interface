import React, { useEffect, useState } from "react";

const getMinutesLeftString = (expiresAt, locale = navigator.language) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires - now;
    if (diffMs <= 0) {
        return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(0, "minute");
    }
    const minutes = Math.ceil(diffMs / (1000 * 60));
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(minutes, "minute");
};

export const Countdown = ({ expiresAt, locale }) => {
    const [timeLeft, setTimeLeft] = useState(() => getMinutesLeftString(expiresAt, locale));

    useEffect(() => {
        setTimeLeft(getMinutesLeftString(expiresAt, locale));
        const interval = setInterval(() => {
            setTimeLeft(getMinutesLeftString(expiresAt, locale));
        }, 1000 * 10);
        return () => clearInterval(interval);
    }, [expiresAt, locale]);

    return <span style={{ marginLeft: 8 }}>{timeLeft}</span>;
};
