import React, { useEffect, useState, memo } from "react";
import config from "../../../config";
import http from "../../../lib/api";

const RoomsList = memo(() => {
  // const [rooms, setRooms] = useState<object[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`${config.apiUrl}/rooms`, {
  //       credentials: "include",
  //     });
  //     const body: object[] = await response.json();

  //     setRooms(body);
  //   };

  //   fetchData();
  // }, []);

  return <>RoomsList</>;
});

export default RoomsList;
