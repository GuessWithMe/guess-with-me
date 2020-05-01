import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const Countdown = () => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((countdown) => (countdown < 1 ? 30 : countdown - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.countdown}>{countdown}</Text>
    </View>
  );
};

export default Countdown;
