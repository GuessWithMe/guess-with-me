import { Socket } from 'socket.io';

interface RedisGuess {
  titleCorrect: boolean;
  artistCorrect: boolean;
}

const allPlayersFinished = (guesses: any) => {
  return !Object.values(guesses).some(({ titleCorrect, artistCorrect }) => !titleCorrect || !artistCorrect);
};

const roomHelper = { allPlayersFinished };
export default roomHelper;
