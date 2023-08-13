import { NavLink } from "react-router-dom";

function NavigationBar() {
  function handleClassNames({ isActive }) {
    return `flex gap-2 justify-center rounded-lg hover:bg-yellow-300 px-3 py-2 ${
      isActive ? "font-bold" : ""
    }`;
  }

  return (
    <div className="bg-yellow-400 ">
      <div className="container mx-auto px-4 py-3 flex flex-col items-center justify-center sm:flex-row  sm:justify-between flex-wrap">
        <h1 className="text-3xl font-bold">IMDB</h1>

        <div className="flex gap-4">
          <NavLink to="/" className={handleClassNames}>
            Movies
          </NavLink>
          <NavLink to="/watchlist" className={handleClassNames}>
            Watch List
          </NavLink>
          <NavLink to="/starredlist" className={handleClassNames}>
            Starred list
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
