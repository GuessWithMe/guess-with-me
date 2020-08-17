import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
} from "@material-ui/core";
import { Close, Check } from "@material-ui/icons";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import FuzzySet from "fuzzyset.js";
import ReactHowler from "react-howler";

import roomAtoms from "recoil/atoms/room";

import RoomPlayers from "sections/RoomPlayers";

import Timer from "components/Timer";

import useRoom from "hooks/useRoom";

import { Song, Artist } from "commonTypes";

import { guessHelper } from "helpers";

import useStyles from "./styles";

interface Guess {
  artist: {
    word: string;
    correct: boolean;
  }[];
  name: {
    word: string;
    correct: boolean;
  }[];
}

const RoomShow = memo(() => {
  useRoom();
  const player = useRef<ReactHowler>(null);
  const styles = useStyles();
  const room = useRecoilValue(roomAtoms.current);

  const [input, setInput] = useState("");
  const [guess, setGuess] = useState<Guess>({
    artist: [],
    name: [],
  });
  const [flash, setFlash] = useState({
    red: false,
    green: false,
  });

  const splitIntoGuessWords = useCallback((text: string) => {
    return text.split(" ").map((word) => {
      return {
        word: guessHelper.cleanUpWord(word),
        correct: false,
      };
    });
  }, []);

  const prepareGuessArray = useCallback(
    ({ artists, name }: { artists: Artist[]; name: Song["name"] }) => {
      return {
        artist: splitIntoGuessWords(artists[0].name),
        name: splitIntoGuessWords(name),
      };
    },
    [splitIntoGuessWords]
  );

  const onInputChange = useCallback((ev) => {
    setInput(ev.target.value);
  }, []);

  const onLoad = useCallback(() => {
    if (room && room.guess) {
      const { artists, name } = room.guess;

      setGuess(prepareGuessArray({ artists, name }));
      player.current?.seek(room.timeLeft);
    }
  }, [prepareGuessArray, room]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const fuzzyMatch = useCallback((input, wordToMatch) => {
    const fuzzyset = FuzzySet();
    fuzzyset.add(wordToMatch.toLowerCase());
    const match = fuzzyset.get(input.toLowerCase());

    return match && match[0][0] > 0.74;
  }, []);

  const doFlash = useCallback((positive: boolean) => {
    setFlash({
      green: positive,
      red: !positive,
    });

    setTimeout(() => {
      setFlash({
        green: false,
        red: false,
      });
    }, 600);
  }, []);

  const matchGuessInput = useCallback(
    (guess: Guess) => {
      const inputWords = input.split(" ");
      let somethingWasCorrect = false;

      const guessCopy = { ...guess };

      for (const inputWord of inputWords) {
        // eslint-disable-next-line no-loop-func
        guessCopy.artist = guessCopy.artist.map((guessWord) => {
          // No need to check if word already guessed
          if (!guessWord.correct) {
            if (fuzzyMatch(inputWord, guessWord.word)) {
              somethingWasCorrect = true;
              guessWord.correct = true;
            }
          }
          return guessWord;
        });

        // eslint-disable-next-line no-loop-func
        guessCopy.name = guessCopy.name.map((guessWord) => {
          // No need to check if word already guessed
          if (!guessWord.correct) {
            if (fuzzyMatch(inputWord, guessWord.word)) {
              somethingWasCorrect = true;
              guessWord.correct = true;
            }
          }

          return guessWord;
        });

        if (somethingWasCorrect) {
          doFlash(true);
        } else {
          doFlash(false);
        }
      }

      setGuess(guessCopy);
      // this.checkIfTitleOrArtistDone();
    },
    [input, doFlash, fuzzyMatch]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      matchGuessInput(guess);
      setInput("");
    },
    [guess, matchGuessInput]
  );

  if (!room) {
    return null;
  }

  // A hack for checking if audio context is suspended or not.
  const audioContext = new AudioContext();

  return (
    <Container maxWidth="xs">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Close
          className={clsx(styles.guessMarker, flash.red && "flash", "red")}
        />
        <Typography variant="h1" className={styles.timer}>
          <Timer timeLeft={room.timeLeft} />
        </Typography>
        <Check
          className={clsx(styles.guessMarker, flash.green && "flash", "green")}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Artist */}
        <Box display="block">
          {guess.artist.map(({ word, correct }, key) => (
            <Box key={key} className={styles.wordContainer}>
              {!correct &&
                word.split("").map((letter, idx) => <span key={idx}>_</span>)}
              {correct && <span>{word}</span>}
            </Box>
          ))}
        </Box>
        {/* Name */}
        <Box display="block">
          {guess.name.map(({ word, correct }, key) => (
            <Box key={key} className={styles.wordContainer}>
              {!correct &&
                word.split("").map((letter, idx) => <span key={idx}>_</span>)}
              {correct && <span>{word}</span>}
            </Box>
          ))}
        </Box>

        {audioContext.state === "suspended" ? (
          <Button onClick={onLoad}>Unmute</Button>
        ) : (
          <ReactHowler
            src={room.guess.previewUrl}
            playing={true}
            ref={player}
            html5={true}
            volume={0.01}
          />
        )}

        <form noValidate onSubmit={onSubmit} autoComplete="off">
          <TextField
            value={input}
            placeholder={"Type here"}
            onChange={onInputChange}
            className={styles.input}
          />
        </form>
        {/* )} */}
      </Box>
      <RoomPlayers />
    </Container>
  );
});

export default RoomShow;
