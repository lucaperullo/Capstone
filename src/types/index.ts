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
  _id: string;
  participants: [
    {
      userId: {
        _id: string;
        username: string;
        bio: string;
        profilePic: string;
        status: {
          music: string;
          presence: string;
        };
      };
      socketId: string;
    }
  ];
}
