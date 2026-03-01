import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import {
    Package,
    LayoutDashboard,
    Tag,
    User,
    LogOut,
    ChevronRight,
    Camera,
} from "lucide-react";
import api from "../../api/api";

function Perfil() {
    const [userName, setUserName] = useState("Usuário");

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const response = await api.get("/api/auth/me");
                setUserName(response.data.name || "Usuário");
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            }
        }

        carregarUsuario();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const menuItems = [
        { icon: <Package size={18} />, label: "Produtos", href: "/produtos" },
        { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
        { icon: <Tag size={18} />, label: "Categorias", href: "/categoria" },
        { icon: <LogOut size={18} />, label: "Sair", action: handleLogout },
    ];

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-1 min-h-screen  ml-0 lg:ml-62.5 items-center justify-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl px-6 py-10">

                    {/* Perfil */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-44 h-44 bg-linear-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl mb-6 relative">
                            <Camera className="text-white opacity-80" size={40} />
                        </div>

                        <h1 className="text-3xl font-bold text-purple-800">
                            {userName}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Bem-vindo ao seu painel
                        </p>
                    </div>

                    {/* Menu */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md border border-purple-100">
                        <ul className="flex flex-col divide-y divide-purple-100">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={
                                        item.action
                                            ? item.action
                                            : () => (window.location.href = item.href)
                                    }
                                    className="flex items-center justify-between py-4 px-2 rounded-xl transition hover:bg-purple-50 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                                            <span className="text-purple-700">
                                                {item.icon}
                                            </span>
                                        </div>

                                        <span
                                            className={`font-medium ${item.label === "Sair"
                                                ? "text-red-500"
                                                : "text-purple-800"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>

                                    <ChevronRight
                                        size={18}
                                        className="text-purple-300"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Perfil;