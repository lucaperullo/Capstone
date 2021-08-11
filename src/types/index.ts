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
export interface Tracks {
  body: {
    tracks: Tracks1;
  };
}
export interface Tracks1 {
  href: string;
  items?: ItemsEntity[] | null;
  limit: number;
  next: string;
  offset: number;
  previous?: null;
  total: number;
}
export interface ItemsEntity {
  album: Album;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url?: null;
  track_number: number;
  type: string;
  uri: string;
}
export interface Album {
  album_type: string;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}
export interface ExternalIds {
  isrc: string;
}
