import { useState, useEffect } from "react";

const useCountDown = (initialTime) => {
  const [days, setDays] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeDiff1, setTimeDiff1] = useState(false);

  const countDown = () => {
    const today = new Date().getTime();
    const endDate = new Date(initialTime).getTime();
    const timeDiff = endDate - today;
    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;

    var timeDays = Math.floor(timeDiff / d);
    var timeHours = Math.floor((timeDiff % d) / h);
    var timeMinutes = Math.floor((timeDiff % h) / m);
    var timeSeconds = Math.floor((timeDiff % m) / s);
    setDays(timeDays);
    setHours(timeHours);
    setMinutes(timeMinutes);
    setSeconds(timeSeconds);
    setTimeDiff1(timeDiff);
  };
  useEffect(() => {
    if (!timeDiff1) {
      setTimeDiff1(true);
      countDown();
    }
  }, [timeDiff1]);

  useEffect(() => {
    const id = setInterval(countDown, 1000);
    return () => clearInterval(id);
  });

  return {
    days,
    hours,
    minutes,
    seconds,
    timeDiff1,
  };
};

export default useCountDown;
