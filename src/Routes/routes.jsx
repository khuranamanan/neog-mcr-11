import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import PageNotFound from "../Pages/PageNotFound";
import WatchListPage from "../Pages/WatchListPage";
import StarredListPage from "../Pages/StarredListPage";
import MovieDetailsPage from "../Pages/MovieDetailsPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="watchlist" element={<WatchListPage />} />
      <Route path="starredlist" element={<StarredListPage />} />
      <Route path="movie/:id" element={<MovieDetailsPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
