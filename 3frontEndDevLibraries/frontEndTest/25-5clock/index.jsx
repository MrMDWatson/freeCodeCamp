function TopControls({ timerSessionTime, sessionIncrement, sessionDecrement, timerBreakTime, breakIncrement, breakDecrement }) {
  return (
    <div className="Top-Controls">
      <button onClick={sessionIncrement}>Up</button>
      {Math.floor(timerSessionTime/6000)}
      <button onClick={sessionDecrement}>Down</button>
      <button onClick={breakIncrement}>Up</button>
      {Math.floor(timerBreakTime/6000)}
      <button onClick={breakDecrement}>Down</button>
    </div>
  );
}

function Display({ sessionTimeLeft, breakTimeLeft }) {
  const sessionDisplay = {
    minutes: Math.floor(sessionTimeLeft/6000),
    seconds: Math.floor((sessionTimeLeft % 6000)/100),
    milsec: sessionTimeLeft % 100
  }
  const breakDisplay = {
    minutes: Math.floor(breakTimeLeft/6000),
    seconds: Math.floor((breakTimeLeft % 6000)/100),
    milsec: breakTimeLeft % 100
  }
  return (
    <div className="Display">
      {sessionTimeLeft > 0
        ? (
          <>
            <h3>Session</h3>
            <h1>{sessionDisplay.minutes}:{sessionDisplay.seconds > 9 ? sessionDisplay.seconds : "0" + sessionDisplay.seconds}:{sessionDisplay.milsec > 9 ? sessionDisplay.milsec : "0" + sessionDisplay.milsec}</h1>
          </>
        )
        : (
          <>
            <h3>Break</h3>
            <h1>{breakDisplay.minutes}:{breakDisplay.seconds > 9 ? breakDisplay.seconds : "0" + breakDisplay.seconds}:{breakDisplay.milsec > 9 ? breakDisplay.milsec : "0" + breakDisplay.milsec}</h1>
          </>
        )
      }
    </div>
  );
}

function BottomControls({ timerOn, startTimer, stopTimer, resetTimer }) {
  return (
    <div className="Bottom-Controls">
      <button onClick={!timerOn ? startTimer : stopTimer}>{!timerOn ? "Start" : "Stop"}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

function Timer() {
  const [timer, setTimer] = React.useState();
  const [timerSessionTime, setTimerSessionTime] = React.useState(150000); // x10ms
  const [timerBreakTime, setTimerBreakTime] = React.useState(30000); // x10ms
  const [elapsedTime, setElapsedTime] = React.useState(0); // x10ms
  const [timerOn, setTimerOn] = React.useState(false);
  const sessionTimeLeft = timerSessionTime - elapsedTime;
  const breakTimeLeft = timerBreakTime + timerSessionTime - elapsedTime;
  const sessionIncrement = () => {
    if (!timerOn) {
      setTimerSessionTime((prev) => prev + 6000);
    }
  }
  const sessionDecrement = () => {
    if (timerSessionTime > 6000 && !timerOn) {
      setTimerSessionTime((prev) => prev - 6000);
    }
  }
  const breakIncrement = () => {
    if (!timer) {
      setTimerBreakTime((prev) => prev + 6000);
    }
  }
  const breakDecrement = () => {
    if (timerBreakTime > 6000 && !timerOn) {
      setTimerBreakTime((prev) => prev - 6000);
    }
  }
  const countDown = () => {
    setElapsedTime((prev) => prev + 10);
  }
  const startTimer = () => {
    setTimer(setInterval(countDown, 100));
    setTimerOn(true);
  }
  const stopTimer = () => {
    clearInterval(timer);
    setTimerOn(false);
  }
  const resetTimer = () => {
    clearInterval(timer);
    setElapsedTime(0);
    setTimerSessionTime(150000);
    setTimerBreakTime(30000);
    setTimerOn(false);
  }
  if (elapsedTime >= timerSessionTime + timerBreakTime) {
    setElapsedTime(0);
  }
  return (
    <div id="Timer">
      <h2 className="Title">25 + 5 Clock</h2>
      <TopControls
        timerSessionTime={timerSessionTime}
        sessionIncrement={sessionIncrement}
        sessionDecrement={sessionDecrement}
        timerBreakTime={timerBreakTime}
        breakIncrement={breakIncrement}
        breakDecrement={breakDecrement} />
      <Display
        sessionTimeLeft={sessionTimeLeft}
        breakTimeLeft={breakTimeLeft} />
      <BottomControls
        timerOn={timerOn}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer} />
    </div>
  );
}

ReactDOM.render(<Timer />, document.getElementById("root"));