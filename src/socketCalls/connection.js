import io from "socket.io-client";

export const socketConnection = () => {
  const socket = io.connect(
    `${
      process.env.REACT_APP_NODE_ENV === "Dev"
        ? "http://localhost:3999"
        : "https://capstonebe.herokuapp.com"
    }`
  );
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.on("RECIVE_MESSAGE", () => {
    alert("message incoming");
  });
  return socket;
};
