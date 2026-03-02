import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // Se não houver token, redireciona para a página de login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Se houver token, renderiza a página
    return children;
};

export default ProtectedRoute;