import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Album, Artist, Song, Room } from 'models';
import { RoomStatus } from '@types';
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
    // SocketWrapper.namespaces.rooms.in(slug).emit('song', {
    //   song: room.song,
    //   startTime
    // });
  });
}

const processSongEnding = async (): Promise<void> => {
  isPaused = true;

  console.log('- PROCESS SONG ENDING -');

  const roomPrevSongs = await updatePreviousTracks();
  Object.entries(roomPrevSongs || {}).forEach(([slug, prevSongs], idx) => {
    // SocketWrapper.namespaces.rooms.in(slug).emit('prevSongs', prevSongs);
  });
};

/**
 * Sends a pause event and restarts with a new guess after certain number of
 * seconds have passed.
 */
const restartAfterPause = async () => {
  // new SocketService().sendPause();
  // Start a new after a pause.
  // setTimeout(async () => {
  //   await start();
  // }, PAUSE_LENGTH);
};

const updatePreviousTracks = async () => {
  const rooms: Record<Room['slug'], RoomStatus> = JSON.parse(await redis.get('rooms'));
  // rooms = Object.entries(rooms).reduce((sum, [slug, room]) => {
  //   room.prevSongs.unshift(room.song);
  //   const prevSongs = room.prevSongs.slice(0, 10);

  //   return {
  //     ...sum,
  //     [slug]: {
  //       ...room,
  //       prevSongs
  //     }
  //   };
  // }, {});

  const roomPrevSongs: Record<Room['slug'], Song[]> = {};
  const updatePromises = Object.entries(rooms).map(([slug, room]) => {
    room.prevSongs.unshift(room.song);
    const prevSongs = room.prevSongs.slice(0, 10);

    // @ts-ignore
    roomPrevSongs[slug] = prevSongs;
    return redis.set('rooms', `["${slug}"].prevSongs`, prevSongs);
  });

  await Promise.all(updatePromises);

  return roomPrevSongs;
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
