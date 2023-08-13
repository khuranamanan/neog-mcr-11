import { useNavigate, useParams } from "react-router";
import { useData } from "../Context/DataContext";
import { AiOutlineArrowLeft, AiFillStar } from "react-icons/ai";

function MovieDetailsPage() {
  const { id } = useParams();
  const { state, dispatch } = useData();
  const navigate = useNavigate();

  const movie = state.moviesData.find((movie) => movie.id.toString() === id);

  if (!movie) {
    return <p>Movie not found.</p>;
  }

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
    <div className="w-full flex flex-col items-center justify-center gap-6 p-8 mb-20">
      <button
        onClick={() => navigate(-1)}
        className="bg-yellow-400 hover:bg-yellow-300 p-2 rounded-full mb-4 w-fit self-start"
      >
        <AiOutlineArrowLeft />
      </button>
      <div className="max-w-xs h-72">
        <img
          src={movie.imageURL}
          alt={movie.title}
          className="w-full h-full object-contain mr-8"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">{movie.title}</h2>
        <p className="text-gray-500 mt-2">{movie.year}</p>
        <p className="text-gray-500">{movie.genre.join(", ")}</p>
        <div
          className={`text-white rounded px-2 py-1 w-fit mr-2 text-sm ${
            movie.rating <= 3
              ? "bg-red-500"
              : movie.rating <= 7
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          <AiFillStar className="mr-1 inline-block" /> {movie.rating}
        </div>
        <p className="text-gray-600 mt-4">{movie.summary}</p>
        <div className="mt-4">
          <span className="font-medium">Director:</span> {movie.director}
        </div>
        <div className="mt-2">
          <span className="font-medium">Writer:</span> {movie.writer}
        </div>
        <div className="mt-2">
          <span className="font-medium">Cast:</span> {movie.cast.join(", ")}
        </div>
        <div className="mt-2">
          <span className="font-medium">Rating:</span> {movie.rating}
        </div>
        <div className="flex gap-2 items-center self-center text-lg">
          <button
            className={`bg-blue-500 text-white px-2 py-1 rounded ${
              isMovieInWatchlist ? "bg-red-500" : ""
            }`}
            onClick={handleWatchlistToggle}
          >
            {isMovieInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
          <button
            className={`bg-yellow-400 px-2 py-1 rounded ${
              isMovieInStarredList ? "bg-red-500" : ""
            }`}
            onClick={handleStarredListToggle}
          >
            {isMovieInStarredList ? "Remove from Starred" : "Add to Starred"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
