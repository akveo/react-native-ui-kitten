export const batch = (target, batchSize, offset = 0) => target.reduce((res, item, index) => {
  const chunkIndex = Math.floor((index + offset) / batchSize);
  if (!res[chunkIndex]) {
    res[chunkIndex] = [];
  }
  res[chunkIndex].push(item);
  return res;
}, []);

/**
   * returns array with numbers from zero to bound.
   * */
export const range = (bound, producer = (i) => i) => {
  const arr = [];

  for (let i = 0; i < bound; i += 1) {
    arr.push(producer(i));
  }

  return arr;
};
