import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//login
import Login from "./pages/Login";

const router = createBrowserRouter([
  //rotas login
  {
    path: "/",
    element: <Login />,
  },


]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
