import React, { useState, useEffect } from 'react';
import Banner from './Images/Banner.jpg'
import './App.css';

function App() {
  const [time, setTime] = useState(0); // Track time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Track whether the stopwatch is running
  const [laps, setLaps] = useState([]); // Store lap times

  // useEffect to update the time every 10ms
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // Formatting time in MM:SS:ms
  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const getMinutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  // Start/Stop button functionality
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset button functionality
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Lap button functionality
  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleLap} disabled={!isRunning}>Lap</button>
        <button onClick={handleReset} disabled={time === 0}>Reset</button>
      </div>
      <div className="laps">
        {laps.map((lap, index) => (
          <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
