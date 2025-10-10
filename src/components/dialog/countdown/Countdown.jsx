import React, { useEffect, useState } from "react";


const getLargestUnitLeftString = (expiresAt, locale = navigator.language) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires - now;
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (diffMs <= 0) {
        return rtf.format(0, "minute");
    }
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days >= 1) {
        return rtf.format(days, "day");
    } else if (hours >= 1) {
        return rtf.format(hours, "hour");
    } else {
        return rtf.format(minutes, "minute");
    }
};

export const Countdown = ({ expiresAt, locale }) => {
    const [timeLeft, setTimeLeft] = useState(() => getLargestUnitLeftString(expiresAt, locale));

    useEffect(() => {
        setTimeLeft(getLargestUnitLeftString(expiresAt, locale));
        const interval = setInterval(() => {
            setTimeLeft(getLargestUnitLeftString(expiresAt, locale));
        }, 10000);
        return () => clearInterval(interval);
    }, [expiresAt, locale]);

    return <span style={{paddingLeft: "5px"}}>{timeLeft}</span>;
};
