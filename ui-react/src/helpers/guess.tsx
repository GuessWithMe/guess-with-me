const removeParentheses = (setOfWords: string) => {
  return setOfWords.replace(/ *\([^)]*\) */g, "");
};

const cleanUpWord = (word: string) => {
  // Turn accented chars into normal chars.
  word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Removing special chars and leaving only numbers, letters
  word = word.replace(/[^A-Za-z0-9\s]/g, "");

  return word;
};

const guessHelper = { removeParentheses, cleanUpWord };
export default guessHelper;
