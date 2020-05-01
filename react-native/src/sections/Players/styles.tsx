import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usernameAvatarWrapper: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  isCorrect: {
    flex: 1,
    textAlign: 'center',
  },
  points: {
    flex: 1,
    textAlign: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
});
