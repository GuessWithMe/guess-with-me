import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 150,
    width: '100%',
  },
  countdown: {
    fontSize: 100,
  },
  letter: {
    marginRight: 5,
    fontSize: 20,
  },
  lastLetter: {
    marginRight: 0,
  },
  artist: {
    flexDirection: 'row',
  },
  word: {
    marginRight: 15,
    flexDirection: 'row',
  },
  lastWord: {
    marginRight: 0,
    flexDirection: 'row',
  },
});
