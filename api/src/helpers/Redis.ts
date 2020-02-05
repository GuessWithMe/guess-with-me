const buildKey = (selectors: string[]) => {
  return selectors.join(':');
};

const redisHelper = { buildKey };
export default redisHelper;
