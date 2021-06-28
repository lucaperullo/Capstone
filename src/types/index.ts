export interface Contact {
  contactsNumber: string;
  name?: string;
  roomPic?: string;
  about?: string;
}

export interface UserMe {
  associates: [];
  email?: string;
  phone?: string;
  profilePic?: string;
  rooms?: [];
  username?: string;
  _id?: string;
}

export interface Message {
  sender: string;
  text: string;
  room: string;
}

export interface Group {
  groupPic: string;
  name: string;
  partecipants: [{ user: string; socketId: string }];
  chatHistory: [
    { sender: string; text: string; createdAt: string; attachment: string }
  ];
  images: string;
}
