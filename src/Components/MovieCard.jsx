/* eslint-disable react/prop-types */

import { AiFillStar } from "react-icons/ai";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router";

function MovieCard({ movie }) {
  const { state, dispatch } = useData();
  const navigate = useNavigate();

  const isMovieInWatchlist = state.watchList.includes(movie.id);
  const isMovieInStarredList = state.starredList.includes(movie.id);

  function handleWatchlistToggle(e) {
    e.stopPropagation();

    if (isMovieInWatchlist) {
      dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie.id });
    } else {
      dispatch({ type: "ADD_TO_WATCHLIST", payload: movie.id });
    }
  }

  function handleStarredListToggle(e) {
    e.stopPropagation();

    if (isMovieInStarredList) {
      dispatch({ type: "REMOVE_FROM_STARREDLIST", payload: movie.id });
    } else {
      dispatch({ type: "ADD_TO_STARREDLIST", payload: movie.id });
    }
  }

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="bg-white w-[15rem] rounded-lg shadow-md p-4 border border-gray-200 flex flex-col gap-2 cursor-pointer"
    >
      <div className="h-56 w-full relative">
        <img
          src={movie.imageURL}
          alt={movie.title}
          className="h-full w-full object-contain rounded-md"
        />
        <div
          className={`absolute bottom-2 right-2 text-white rounded px-2 py-1 w-fit mr-2 text-sm ${
            movie.rating <= 3
              ? "bg-red-500"
              : movie.rating <= 7
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          <AiFillStar className="mr-1 inline-block" /> {movie.rating}
        </div>
      </div>
      <div className="flex gap-2 flex-col grow">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-gray-600">{movie.year}</p>
        <p className="text-gray-500">{movie.genre.join(", ")}</p>
        <p className="text-gray-700 mt-2">{movie.summary}</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-between">
        <button
          className={`text-white w-full px-2 py-1 rounded ${
            isMovieInWatchlist ? "bg-red-500" : "bg-gray-900"
          }`}
          onClick={handleWatchlistToggle}
        >
          {isMovieInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
        <button
          className={`w-full px-2 py-1 rounded ${
            isMovieInStarredList ? "bg-red-500 text-white" : "bg-yellow-400"
          }`}
          onClick={handleStarredListToggle}
        >
          {isMovieInStarredList ? "Remove from Starred" : "Add to Starred"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
