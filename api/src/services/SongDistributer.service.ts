import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Album, Artist, Song, Room } from 'models';
import { PreviousTracksHelper } from 'helpers';
import { RoomStatus } from '@types';
import { SocketService } from 'services';
import SocketWrapper from 'lib/SocketWrapper';
import redis from 'config/redis';

const PAUSE_LENGTH = 5000;
const GUESS_TIME = 30000;

// let currentSong: Song;
let isPaused = false;
let timer: NodeJS.Timer;
let leftCountdown: NodeJS.Timer;
let startingTime = moment();

async function start(): Promise<void> {
  clearInterval(timer);
  startingTime = moment();

  await sendNextSong();

  timer = setInterval(async () => {
    await processSongEnding();
    clearInterval(leftCountdown);
    leftCountdown = setInterval(() => {
      const secondsLeft = moment().diff(startingTime, 'seconds');
    }, 1000);

    setTimeout(async () => {
      // Pause ends and a new song gets distributed.
      await sendNextSong();
      startingTime = moment();
    }, PAUSE_LENGTH);
  }, GUESS_TIME + PAUSE_LENGTH);
}

const getRandomSong = async (): Promise<Song> => {
  const song = await Song.findOne({
    include: [Artist, Album],
    order: [Sequelize.fn('RAND')],
    where: {
      // tslint:disable-next-line: no-null-keyword
      previewUrl: { [Op.ne]: null }
    }
  });

  return song;
};

async function sendNextSong(): Promise<void> {
  await redis.open();
  let rooms: Record<Room['slug'], RoomStatus> = JSON.parse(await redis.get('rooms'));
  const songs = await Promise.all(Object.keys(rooms || {}).map(id => getRandomSong()));
  isPaused = false;

  rooms = Object.entries(rooms).reduce((sum, [slug, status], idx) => {
    return {
      ...sum,
      [slug]: {
        ...status,
        song: songs[idx]
      }
    };
  }, {} as Record<Room['slug'], RoomStatus>);

  await redis.set('rooms', '.', rooms);

  const startTime = new Date();
  Object.entries(rooms || {}).forEach(([slug, room], idx) => {
    SocketWrapper.namespaces.rooms.in(slug).emit('song', {
      song: room.song,
      startTime
    });
  });
}

const processSongEnding = async (): Promise<void> => {
  const previousTracks = await updatePreviousTracks();

  isPaused = true;
  new SocketService().sendPause(previousTracks);
};

/**
 * Sends a pause event and restarts with a new guess after certain number of
 * seconds have passed.
 */
const restartAfterPause = async () => {
  const previousTracks = await updatePreviousTracks();
  new SocketService().sendPause(previousTracks);
  // Start a new after a pause.
  // setTimeout(async () => {
  //   await start();
  // }, PAUSE_LENGTH);
};

const updatePreviousTracks = async () => {
  // let previousTracks = await PreviousTracksHelper.get();
  // // previousTracks.unshift(currentSong);
  // previousTracks = previousTracks.slice(0, 10);
  // await PreviousTracksHelper.set(previousTracks);

  // return previousTracks;

  return [] as any;
};

const getCurrentStartTime = () => {
  return startingTime.toDate();
};

export default {
  start,
  getRandomSong,
  sendNextSong,
  processSongEnding,
  restartAfterPause,
  getCurrentStartTime
};
