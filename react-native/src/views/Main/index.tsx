import React from 'react';

import Countdown from '../../sections/Countdown';
import Guess from '../../sections/Guess';
import Players from '../../sections/Players';

const Main = () => {
  return (
    <>
      <Countdown />
      <Guess />
      <Players />
    </>
  );
};

export default Main;
