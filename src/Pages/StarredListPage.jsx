import MovieCard from "../Components/MovieCard";
import { useData } from "../Context/DataContext";

function StarredListPage() {
  const { state } = useData();

  const starredMovies = state.moviesData.filter((movie) =>
    state.starredList.includes(movie.id)
  );

  return (
    <div className="w-full p-8">
      <h1 className="font-bold text-3xl mb-4">Starred Movies</h1>
      {starredMovies.length === 0 ? (
        <p>You haven&apos;t starred any movies yet.</p>
      ) : (
        <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {starredMovies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StarredListPage;
