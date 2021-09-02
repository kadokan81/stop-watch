import React from "react";

function DashBoardComponent({ time }) {
  var seconds = Math.floor((time / 1000) % 60),
    minutes = Math.floor((time / (1000 * 60)) % 60),
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <div className='dashBoard'>
      <span>{hours}</span>
      &nbsp;:&nbsp;
      <span>{minutes}</span>
      &nbsp;:&nbsp;
      <span>{seconds}</span>
    </div>
  );
}

export default DashBoardComponent;
