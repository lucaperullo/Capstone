
export const connectToRooms = (socket, rooms) => {
  rooms.forEach((room) => socket.emit("JOIN_ROOM",{ roomId: room._id }));
};
