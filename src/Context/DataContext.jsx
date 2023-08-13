/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { createContext, useContext } from "react";
import { appInitialState, appReducer } from "../Reducer/appReducer";
import { useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const moviesYears = state.moviesData.reduce(
    (result, { year }) => (result.includes(year) ? result : [...result, year]),
    []
  );

  const moviesGenres = state.moviesData.reduce((genres, movie) => {
    movie.genre.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
    return genres;
  }, []);

  useEffect(() => {
    localStorage.setItem("moviesData", JSON.stringify(state.moviesData));
  }, [state.moviesData]);

  useEffect(() => {
    localStorage.setItem("watchLlist", JSON.stringify(state.watchLlist));
  }, [state.watchLlist]);

  useEffect(() => {
    localStorage.setItem("starredList", JSON.stringify(state.starredList));
  }, [state.starredList]);

  return (
    <DataContext.Provider
      value={{ state, dispatch, moviesGenres, moviesYears }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
