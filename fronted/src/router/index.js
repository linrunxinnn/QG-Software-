import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "personal",
        element: <Personal />,
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "moments",
        element: <Moments />,
      },
    ],
  },
]);
