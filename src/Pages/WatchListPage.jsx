import MovieCard from "../Components/MovieCard";
import { useData } from "../Context/DataContext";

function WatchListPage() {
  const { state } = useData();

  const watchlistMovies = state.moviesData.filter((movie) =>
    state.watchList.includes(movie.id)
  );

  return (
    <div className="w-full p-8">
      <h1 className="font-bold text-3xl mb-4">Watchlist</h1>
      {watchlistMovies.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchListPage;
