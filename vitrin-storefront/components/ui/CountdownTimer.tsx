"use client";

import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface CountdownTimerProps {
  targetDate: Date | string | number;
  className?: string;
}

function calculateTimeLeft(targetTime: number): TimeLeft {
  const now = Date.now();
  const distance = targetTime - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const targetTime = useMemo(
    () =>
      targetDate instanceof Date
        ? targetDate.getTime()
        : new Date(targetDate).getTime(),
    [targetDate]
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetTime));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const items = [
    { label: "ثانیه", value: timeLeft.seconds },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ساعت", value: timeLeft.hours },
    { label: "روز", value: timeLeft.days },
  ];

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-xs sm:text-sm",
        "font-medium text-text-primary",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg",
            "bg-gray-100 px-2 py-1 sm:px-3 sm:py-2",
            "min-w-[52px]"
          )}
        >
          <span className="tabular-nums text-base font-bold sm:text-lg">
            {item.value.toString().padStart(2, "0")}
          </span>
          <span className="mt-0.5 text-[10px] text-text-secondary sm:text-xs">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

