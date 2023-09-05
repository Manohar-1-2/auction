

import React, { useState, useEffect } from 'react';

const CountdownTimer = ({seconds,setSeconds,isActive,setIsActive,handleReset}) => {


  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };


  return (
    <div>
      <h1>Countdown Timer: {seconds}s</h1>

    </div>
  );
};

export default CountdownTimer;