import React, { useEffect } from "react";

import Discover from "./Discover";

export default function Home() {
  const getRooms = async () => {
    const rooms = await fetch(
      process.env.REACT_APP_NODE_ENV === "Dev"
        ? "http://localhost:3999/rooms"
        : "https://capstonebe.herokuapp.com/rooms",
      { credentials: "include" }
    );

    console.log(rooms);
  };
  useEffect(() => {
    getRooms();
  }, []);
  return <Discover />;
}
