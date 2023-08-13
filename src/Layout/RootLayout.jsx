import { Outlet, useLocation } from "react-router";
import NavigationBar from "../Components/NavigationBar";
import { useEffect } from "react";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <NavigationBar />

      <div className="container mx-auto p-2 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
