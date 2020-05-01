import React, {memo, Props} from 'react';
import {Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Player from 'types/Player';

import s from './styles';

const Players = memo(() => {
  const players: Player[] = [
    {
      image:
        'https://scontent.frix4-1.fna.fbcdn.net/v/t31.0-8/23405883_1681444165223585_8391559028650549752_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_oc=AQkGZWd6EXG4s5iVw5yuvEmjSizlYh1sHy6xh7MDijglqaVFOIhFnep8TywWw6-TDtM&_nc_ht=scontent.frix4-1.fna&oh=c9a0c5563a4f50e11adec6744924ced5&oe=5EB9C3A2',
      username: 'e2e2',
      isArtistCorrect: true,
      isTitleCorrect: true,
      points: 20,
    },
  ];

  return (
    <View style={s.wrapper}>
      <View style={s.header}>
        <View style={s.usernameAvatarWrapper}></View>
        <Text style={s.isCorrect}>Artist</Text>
        <Text style={s.isCorrect}>Title</Text>
        <Text style={s.points}>Points</Text>
      </View>
      {players.map(({username, image, points}) => (
        <View style={s.player}>
          <View style={s.usernameAvatarWrapper}>
            <Image style={s.avatar} source={{uri: image}} />
            <Text style={s.username}>{username}</Text>
          </View>
          <Icon name="check" style={s.isCorrect} size={20} />
          <Icon style={s.isCorrect} name="close" size={20} />
          <Text style={s.points}>{points}</Text>
        </View>
      ))}
    </View>
  );
});

export default Players;
