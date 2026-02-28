import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//login
import Login from "./pages/login";
//home
import Produtos from "./pages/produtos"
//dashboard
import Dashboard from "./pages/dashboard"
//categoria
import Categoria from "./pages/categoria"
//crud produto
import VerProduto from "./pages/verProduto"
import EditarProduto from "./pages/editarProduto"
import AdicionaProdutos from "./pages/novoProduto"
//perfil
import Perfil from "./pages/perfil"

const router = createBrowserRouter([
  //login
  {
    path: "/",
    element: <Login />,
  },
  //home/produtos

  {
    path: "/produtos",
    element: <Produtos />,
  },

  //dashboard
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  //categoria
  {
    path: "/categoria",
    element: <Categoria />,
  },

  //crud produtos
  //ver produto
  {
    path: "/ver-produto/:id",
    element: <VerProduto />,
  },
  //adiciona produtos
  {
    path: "/adiciona-produto",
    element: <AdicionaProdutos />,
  },
  // editar produto
  {
    path: "/editar/:id",
    element: <EditarProduto />,
  },

  //perfil
  {
    path: "/perfil",
    element: <Perfil />,
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
