"use client";

import { useState, useEffect } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const fullDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <div className="hidden md:flex flex-col items-center justify-center text-white p-8 rounded-2xl bg-black/50 backdrop-blur-md h-full">
      <div className="text-7xl md:text-8xl font-bold tracking-tighter">
        {time}
      </div>
      <div className="text-lg md:text-xl mt-2">{fullDate}</div>
    </div>
  );
};

export default Clock;
