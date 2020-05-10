import React, { memo } from "react";
import Header from "../../../sections/Header";
import { useSelector } from "react-redux";

const RoomShow = memo(() => {
  const game = useSelector((state) => state);

  return (
    <>
      <Header></Header>
    </>
  );
});

export default RoomShow;
