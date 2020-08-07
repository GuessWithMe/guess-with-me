const allPlayersFinished = (guesses: any) => {
  return !Object.values(guesses).some(({ titleCorrect, artistCorrect }) => !titleCorrect || !artistCorrect);
};

const roomHelper = { allPlayersFinished };
export default roomHelper;
