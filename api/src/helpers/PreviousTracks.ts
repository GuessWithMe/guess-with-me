import redis from '@config/redis';

import { PREVIOUS_TRACKS } from '@consts/redis';
import { Song } from '@models';

const get = async () => {
  await redis.open();
  const previousTracks = await redis.getAsync(PREVIOUS_TRACKS);

  if (previousTracks) {
    return JSON.parse(previousTracks);
  }
  return [];
};

const set = async (tracks: Song[]) => {
  await redis.open();
  await redis.setAsync(PREVIOUS_TRACKS, JSON.stringify(tracks));
};

const previousTracksHelper = { get, set };
export default previousTracksHelper;
