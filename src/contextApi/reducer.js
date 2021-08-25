export const initialState = {
  user: null,
  users: null,
  socket: null,
  newReleases: null,
  searchResults: null,
  favourites: null,
  categories: null,
  recent: null,
  forYou: null,
  category: null,
  categoryName: null,
  tracks: null,
  logged: false,
  playing: false,
  idx: 0,
  src: null,
  time: 0,
  cover: "",
  title: "",
  artist: "",
  volume: 0.5,
  song: {
    currentTime: 0,
    duration: 0,
  },
};

export const reducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_TRACK_SPECS":
      return {
        ...state,
        song: {
          currentTime: action.payload.currentTime,
          duration: action.payload.duration,
        },
      };
    case "SET_COVER":
      return {
        ...state,
        cover: action.payload,
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "SET_ARTIST":
      return {
        ...state,
        artist: action.payload,
      };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.payload,
      };
    case "SET_TIME":
      return {
        ...state,
        time: action.payload,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_LOGGED_STATE":
      return {
        ...state,
        logged: action.payload,
      };
    case "SET_RECENT":
      return {
        ...state,
        recent: action.payload,
      };
    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_FOR_YOU":
      return {
        ...state,
        forYou: action.payload,
      };
    case "SET_NEW_RELEASES":
      return {
        ...state,
        newReleases: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        categoryName: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        tracks: action.payload,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_ACTUAL_CHAT":
      return {
        ...state,
        chatTheme: action.payload,
      };
    case "SET_ACTUAL_SONG":
      return {
        ...state,
        src: action.payload,
      };
    case "SET_ACTUAL_IDX":
      return {
        ...state,
        idx: action.payload,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.payload,
      };
    default:
      return state;
  }
};
