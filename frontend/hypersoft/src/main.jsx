import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//login
import Login from "./pages/login";
import CriarConta from "./pages/criarConta";
//home
import Produtos from "./pages/produtos"
// //dashboard
import Dashboard from "./pages/dashboard"
// //categoria
// import Categoria from "./pages/categoria"
// //crud produto
import VerProduto from "./pages/verProduto"
import EditarProduto from "./pages/editarProduto"
import AdicionaProdutos from "./pages/novoProduto"
// //perfil
import Perfil from "./pages/perfil"

const router = createBrowserRouter([
  //login
  {
    path: "/",
    element: <Login />,
  },

  //criar conta
  {
    path: "/criar-conta",
    element: <CriarConta />
  },
  //home/produtos

  {
    path: "/produtos",
    element: (
      <ProtectedRoute>
        <Produtos />
      </ProtectedRoute>
    ),
  },

  //dashboard
  {
    path: "/dashboard",
    element: (<ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>),
  },
  // //categoria
  // {
  //   path: "/categoria",
  //   element:( <ProtectedRoute>
  // <Categoria />
  // </ProtectedRoute>),
  // },

  //crud produtos
  // ver produto
  {
    path: "/produto/:id",
    element: (
      <ProtectedRoute>
        <VerProduto />
      </ProtectedRoute>
    ),
  },
  // adiciona produtos
  {
    path: "/adiciona-produto",
    element: (
      <ProtectedRoute>
        <AdicionaProdutos />
      </ProtectedRoute>
    ),
  },
  // editar produto
  {
    path: "/editar-produto/:id",
    element: (
      <ProtectedRoute>
        <EditarProduto />
      </ProtectedRoute>
    ),
  },

  //perfil
  {
    path: "/perfil",
    element: (
      <ProtectedRoute>
        <Perfil />
      </ProtectedRoute>
    ),
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
