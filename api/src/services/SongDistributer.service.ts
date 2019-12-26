import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Album, Artist, Song } from '@models';
import { PreviousTracksHelper } from '@helpers';
import { RoomStatus } from '@types';
import { SocketService } from '@services';

const PAUSE_LENGTH = 5000;
const GUESS_TIME = 30000;

let currentSong: Song;
let isPaused = false;
let timer: NodeJS.Timer;
let leftCountdown: NodeJS.Timer;
let startingTime = moment();

async function start(): Promise<void> {
  clearInterval(timer);
  startingTime = moment();
  await this.sendNextSong();

  timer = setInterval(
    self => {
      self.processSongEnding();
      clearInterval(leftCountdown);
      leftCountdown = setInterval(() => {
        const secondsLeft = moment().diff(startingTime, 'seconds');
      }, 1000);

      setTimeout(
        async self => {
          // Pause ends and a new song gets distributed.
          await self.sendNextSong();
          startingTime = moment();
        },
        PAUSE_LENGTH,
        self
      );
    },
    GUESS_TIME + PAUSE_LENGTH,
    this
  );
}

async function getStatus(): Promise<RoomStatus> {
  return {
    currentSong,
    isPaused,
    timeLeft: GUESS_TIME / 1000 - moment().diff(startingTime, 'seconds')
  };
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
  const song = await this.getRandomSong();
  currentSong = song;
  isPaused = false;
  new SocketService().sendNextSong(song);
}

const processSongEnding = async (): Promise<void> => {
  const previousTracks = await PreviousTracksHelper.get();
  previousTracks.unshift(currentSong);
  await PreviousTracksHelper.set(previousTracks.slice(0, 10));

  currentSong = undefined;
  isPaused = true;
  new SocketService().sendPause(previousTracks);
};

/**
 * Sends a pause event and restarts with a new guess after certain number of
 * seconds have passed.
 *
 * @returns Promise<void>
 */
const restartAfterPause = (): void => {
  new SocketService().sendPause(currentSong);
  // Start a new after a pause.
  setTimeout(async () => {
    await this.start();
  }, PAUSE_LENGTH);
};

export default {
  start,
  getStatus,
  getRandomSong,
  sendNextSong,
  processSongEnding,
  restartAfterPause
};
