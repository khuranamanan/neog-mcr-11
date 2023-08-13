import { useState } from "react";
import { useData } from "../Context/DataContext";
import MovieCard from "../Components/MovieCard";
import AddMovieModal from "../Components/AddMovieModal";

function HomePage() {
  const { state, moviesGenres, moviesYears } = useData();
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    rating: "",
    search: "",
  });
  const [addMovieModalOpen, setAddMovieModalOpen] = useState(false);

  function closeAddMovieModal() {
    setAddMovieModalOpen(false);
  }

  const filteredMovies = state.moviesData.filter((movie) => {
    const lowerCaseSearch = filters.search.toLowerCase();

    return (
      (filters.year === "" || movie.year.toString() === filters.year) &&
      (filters.genre === "" || movie.genre.includes(filters.genre)) &&
      (filters.rating === "" || movie.rating >= parseInt(filters.rating)) &&
      (filters.search === "" ||
        movie.title.toLowerCase().includes(lowerCaseSearch) ||
        movie.cast.some((actor) =>
          actor.toLowerCase().includes(lowerCaseSearch)
        ) ||
        movie.director.toLowerCase().includes(lowerCaseSearch))
    );
  });

  return (
    <div className="w-full p-8 space-y-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Movies</h1>
        <button
          onClick={() => setAddMovieModalOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-300 px-3 py-2 rounded-md"
        >
          Add Movie
        </button>
        <AddMovieModal
          isOpen={addMovieModalOpen}
          closeModal={closeAddMovieModal}
        />
      </div>
      <h2 className="font-medium text-xl mt-2">Filters</h2>
      <div className="flex flex-wrap gap-2 justify-center items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <label>Search:</label>
          <input
            className="px-2 py-1 border rounded max-w-xs"
            type="text"
            placeholder="Search by title"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label>Year:</label>
          <select
            className="px-2 py-1 border rounded"
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            value={filters.year}
          >
            <option value="">All Years</option>
            {moviesYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label>Genre:</label>
          <select
            className="px-2 py-1 border rounded"
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            value={filters.genre}
          >
            <option value="">All Genres</option>
            {moviesGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label>Rating:</label>
          <select
            className="px-2 py-1 border rounded"
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            value={filters.rating}
          >
            <option value="">All Ratings</option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.length === 0 ? (
          <p className="text-center text-gray-600">
            No movies match the selected filters.
          </p>
        ) : (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
