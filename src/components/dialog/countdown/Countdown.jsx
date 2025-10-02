import React, { useEffect, useState } from "react";

const Countdown = ({ expiresAt }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expires = new Date(expiresAt);
            const diff = expires - now;
            if (diff <= 0) {
                setTimeLeft("0:00:00");
                clearInterval(interval);
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    return <span style={{ marginLeft: 8 }}>{timeLeft}</span>;
};

export default Countdown;
