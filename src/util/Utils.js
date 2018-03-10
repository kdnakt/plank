// @flow

function formatTime(time) {
  const seconds = time % 60;
  const minutes = (time - seconds) / 60;
  return zeroPad(minutes) + ':' + zeroPad(seconds);
}

function zeroPad(time) {
  return `${('00' + time).slice(-2)}`;
}


export { formatTime };
