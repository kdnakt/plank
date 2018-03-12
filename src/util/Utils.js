// @flow

function formatDate(date) {
  return date.getYear() + '/'
      + zeroPad(date.getMonth() + 1)
      + zeroPad(date.getDate());
}

function formatTime(time) {
  const seconds = time % 60;
  const minutes = (time - seconds) / 60;
  return zeroPad(minutes) + ':' + zeroPad(seconds);
}

function zeroPad(time) {
  return `${('00' + time).slice(-2)}`;
}


export {
  formatDate,
  formatTime,
};
