import { movies } from "../Data/data";

export const appInitialState = {
  moviesData: JSON.parse(localStorage.getItem("moviesData")) || movies,
  watchList: JSON.parse(localStorage.getItem("watchList")) || [],
  starredList: JSON.parse(localStorage.getItem("starredList")) || [],
};

export function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };

    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchList: state.watchList.filter((id) => id !== action.payload),
      };

    case "ADD_TO_STARREDLIST":
      return {
        ...state,
        starredList: [...state.starredList, action.payload],
      };

    case "REMOVE_FROM_STARREDLIST":
      return {
        ...state,
        starredList: state.starredList.filter((id) => id !== action.payload),
      };

    case "ADD_MOVIE":
      return {
        ...state,
        moviesData: [...state.moviesData, action.payload],
      };

    default:
      return state;
  }
}
