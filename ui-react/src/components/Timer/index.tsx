import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setTimeout(() => setTimer(timer === 0 ? 30 : timer - 1), 1000);
  }, [timer]);

  return <span>{timer}</span>;
};

export default Timer;
