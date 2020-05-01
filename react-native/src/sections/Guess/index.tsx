import React, {useCallback, useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import FuzzySet from 'fuzzyset.js';

import styles from './styles.tsx';

const Guess = () => {
  const title = 'Breaking the Habit';
  const artist = 'Linkin Park';

  const [input, setInput] = useState('');

  const cleanUpWord = useCallback((word: string) => {
    // Turn accented chars into normal chars.
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Removing special chars and leaving only numbers, letters
    word = word.replace(/[^A-Za-z0-9\s]/g, '');

    return word;
  }, []);

  const removeParentheses = useCallback((setOfWords: string): string => {
    return setOfWords.replace(/ *\([^)]*\) */g, '');
  }, []);

  const onGuess = useCallback(() => {
    // console.log(input);
  }, [input]);

  const prepareGuessArray = (song: {title: string; artist: string}) => {
    const guess = {
      artist: [] as any[],
      title: [] as any[],
    };

    for (const word of removeParentheses(song.artist).split(' ')) {
      const cleanWord = cleanUpWord(word);
      const guessWord: any = {
        word: cleanWord,
        correct: false,
      };

      guess.artist.push(guessWord as any);
    }

    for (const word of removeParentheses(song.title).split(' ')) {
      const cleanWord = cleanUpWord(word);
      const guessWord = {
        word: cleanWord,
        correct: false,
      };
      guess.title.push(guessWord);
    }

    return guess;
  };

  const guess = prepareGuessArray({title, artist});

  const {lastWord, lastLetter} = styles;

  return (
    <View style={styles.wrapper}>
      <View style={styles.artist}>
        {guess.artist.map(({word}, idx) => (
          <View
            style={guess.artist.length - 1 === idx ? lastWord : styles.word}>
            {word.split('').map((letter: any, idx: any) => (
              <Text
                style={[styles.letter, idx === word.length - 1 && lastLetter]}
                key={letter + idx}>
                _
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.artist}>
        {guess.title.map(({word}, idx) => (
          <View style={guess.title.length - 1 === idx ? lastWord : styles.word}>
            {word.split('').map((letter: any, idx: any) => (
              <Text
                style={[styles.letter, idx === word.length - 1 && lastLetter]}
                key={letter + idx}>
                _
              </Text>
            ))}
          </View>
        ))}
      </View>

      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 300,
          paddingHorizontal: 10,
          marginBottom: 50,
          marginTop: 50,
          borderRadius: 5,
        }}
        value={input}
        onSubmitEditing={() => onGuess()}
        onChangeText={(text: string) => setInput(text)}
      />
    </View>
  );
};

export default Guess;
