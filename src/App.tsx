import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Networks from "./pages/networks";
import Error from "./pages/error";

import Private from "./routes/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />,
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: <Networks />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
