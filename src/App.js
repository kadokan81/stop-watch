import { useEffect, useRef, useState } from "react";
import {
  buffer,
  debounceTime,
  filter,
  fromEvent,
  interval,
  map,
  Subject,
  takeUntil,
} from "rxjs";
import "./App.css";
import DashBoardComponent from "./components/DashBoard";

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const waitBtnRef = useRef(null);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(100)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (watchOn) {
          setTime((val) => val + 100);
        }
      });
    const mouse$ = fromEvent(waitBtnRef.current, "click");
    const buff$ = mouse$.pipe(debounceTime(300));
    const click$ = mouse$.pipe(
      buffer(buff$),
      map((list) => {
        return list.length;
      }),
      filter((x) => x === 2)
    );

    click$.subscribe(() => {
      setWatchOn(false);
    });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);

  const handlerStartStop = () => {
    setWatchOn(!watchOn);
    if (watchOn) {
      setTime(0);
    }
  };
  const handlerReset = () => {
    setTime(0);
    setWatchOn(true);
  };

  return (
    <div className='App'>
      <DashBoardComponent time={time} />
      <button
        onClick={handlerStartStop}
        style={{ color: watchOn ? "red" : "blue" }}>
        {watchOn ? "stop" : "start"}
      </button>
      <button style={{ color: watchOn ? "green" : "gray" }} ref={waitBtnRef}>
        wait
      </button>
      <button style={{ color: "black" }} onClick={handlerReset}>
        reset
      </button>
    </div>
  );
}

export default App;
