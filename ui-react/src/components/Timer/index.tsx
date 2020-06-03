import React, { useState, useEffect } from "react";

interface Props {
  timeLeft: number;
}

const Timer = ({ timeLeft }: Props) => {
  const [timer, setTimer] = useState(timeLeft);

  useEffect(() => {
    setTimeout(() => setTimer(timer === 0 ? 30 : timer - 1), 1000);
  }, [timer]);

  return <span>{timer}</span>;
};

export default Timer;
