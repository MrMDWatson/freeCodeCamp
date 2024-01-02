function TopControls({ timerSessionTime, sessionIncDec, timerBreakTime, breakIncDec }) {
  return (
    <div id="Top-Controls">
      <div id="Session-Controls">
        <h4 id="session-label">Session Length</h4>
        <div>
          <button id="session-increment" onClick={() => sessionIncDec("+")}>+</button>
          <h5 id="session-length">{Math.floor(timerSessionTime/6000)}</h5>
          <button id="session-decrement" onClick={() => sessionIncDec("-")}>-</button>
        </div>
      </div>
      <div id="Break-Controls">
        <h4 id="break-label">Break Length</h4>
        <div>
          <button id="break-increment" onClick={() => breakIncDec("+")}>+</button>
          <h5 id="break-length">{Math.floor(timerBreakTime/6000)}</h5>
          <button id="break-decrement" onClick={() => breakIncDec("-")}>-</button>
        </div>
      </div>
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
      {sessionTimeLeft >= 0
        ? (
          <>
            <h3 id="timer-label">Session</h3>
            <h1 id="time-left">{sessionDisplay.minutes > 9 ? sessionDisplay.minutes : "0" + sessionDisplay.minutes}:{sessionDisplay.seconds > 9 ? sessionDisplay.seconds : "0" + sessionDisplay.seconds}</h1>
          </>
        )
        : (
          <>
            <h3 id="timer-label">Break</h3>
            <h1 id="time-left">{breakDisplay.minutes > 9 ? breakDisplay.minutes : "0" + breakDisplay.minutes}:{breakDisplay.seconds > 9 ? breakDisplay.seconds : "0" + breakDisplay.seconds}</h1>
          </>
        )
      }
    </div>
  );
}

function BottomControls({ timerOn, startTimer, stopTimer, resetTimer }) {
  return (
    <div className="Bottom-Controls">
      <button id="start_stop" onClick={!timerOn ? startTimer : stopTimer}>{!timerOn ? "Start" : "Stop"}</button>
      <button id="reset" onClick={resetTimer}>Reset</button>
    </div>
  );
}

function Timer() {
  const [timerSessionTime, setTimerSessionTime] = React.useState(150000); // x10ms
  const [timerBreakTime, setTimerBreakTime] = React.useState(30000); // x10ms
  const [elapsedTime, setElapsedTime] = React.useState(0); // x10ms
  const [timerOn, setTimerOn] = React.useState(false);
  const timer = React.useRef();
  const sessionTimeLeft = timerSessionTime - elapsedTime;
  const breakTimeLeft = timerBreakTime + timerSessionTime - elapsedTime;
  const sessionIncDec = (operator) => {
    if (!timerOn && timerSessionTime > 6000 && timerSessionTime < 360000) {
      if (operator == "+") {
        setTimerSessionTime((prev) => prev + 6000);
      } else if (operator == "-") {
        setTimerSessionTime((prev) => prev - 6000);
      }
    }
  }
  const breakIncDec = (operator) => {
    if (!timerOn && timerBreakTime > 6000 && timerBreakTime < 360000) {
      if (operator == "+") {
        setTimerBreakTime((prev) => prev + 6000);
      } else if (operator == "-") {
        setTimerBreakTime((prev) => prev - 6000);
      }
    }
  }
  const countDown = () => {
    setElapsedTime((prev) => prev + 100);
  }
  const startTimer = () => {
    timer.current = setInterval(countDown, 1000);
    setTimerOn(true);
  }
  const stopTimer = () => {
    clearInterval(timer.current);
    setTimerOn(false);
  }
  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
    setTimerSessionTime(150000);
    setTimerBreakTime(30000);
  }
  if (elapsedTime >= timerSessionTime + timerBreakTime) {
    setElapsedTime(0);
  }
  return (
    <div id="Timer">
      <h2 className="Title">25 + 5 Clock</h2>
      <TopControls
        timerSessionTime={timerSessionTime}
        sessionIncDec={sessionIncDec}
        timerBreakTime={timerBreakTime}
        breakIncDec={breakIncDec} />
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