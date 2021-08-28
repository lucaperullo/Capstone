import io from "socket.io-client";

export const socketConnection = () => {
  const socket = io.connect(
    `${
      process.env.REACT_APP_NODE_ENV === "Production"
        ? "https://capstonebe.herokuapp.com"
        : "https://capstonebe.herokuapp.com"
    }```
  );
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  return socket;
};
