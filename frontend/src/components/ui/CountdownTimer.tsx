"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
    targetDate: string;
    className?: string;
    showSeconds?: boolean;
}

export default function CountdownTimer({ targetDate, className = "", showSeconds = true }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60))), // Total hours
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    // Format with leading zeros
    const format = (num: number) => num.toString().padStart(2, "0");

    // If time is up, don't render anything (or render 00:00:00)
    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        return null;
    }

    return (
        <div className={`flex items-center gap-1 font-mono text-sm font-bold tracking-widest ${className}`} dir="ltr">
            <span>{format(timeLeft.hours)}</span>
            <span>:</span>
            <span>{format(timeLeft.minutes)}</span>
            {showSeconds && (
                <>
                    <span>:</span>
                    <span>{format(timeLeft.seconds)}</span>
                </>
            )}
        </div>
    );
}
