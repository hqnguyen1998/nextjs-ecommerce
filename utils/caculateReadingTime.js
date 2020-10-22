// Average word per minute
const wordPerMin = 275;

let result = '';

const caculateReadingTime = (text) => {
  const time = Math.ceil(text.length / wordPerMin);

  result = `${time} min read`;

  return result;
};

export default caculateReadingTime;
