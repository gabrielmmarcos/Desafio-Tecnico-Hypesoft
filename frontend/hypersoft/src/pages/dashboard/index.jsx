import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import DashboardComponent from "../../components/charts/dashboard";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Package, Plus } from "lucide-react";

function Dashboard() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await api.get("/api/dashboard");
                setData(res.data);
            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="md:ml-64 p-10">Carregando...</div>
            </>
        );
    }

    const semDados = data?.totalProducts === 0;

    return (
        <>
            <Navbar />

            <div className="md:ml-64 min-h-screen bg-gray-50 p-6 md:p-10">

                {/* HEADER ROXO */}
                <div className="bg-linear-to-r from-purple-700 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-purple-100 mt-2">
                        Controle total do seu estoque
                    </p>
                </div>

                {semDados ? (
                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                        <Package size={70} className="mx-auto text-purple-600 mb-6" />

                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Nenhum produto cadastrado
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Comece adicionando seu primeiro produto para visualizar estatísticas.
                        </p>

                        <button
                            onClick={() => navigate("/produtos/novo")}
                            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
                        >
                            <Plus size={18} />
                            Adicionar Produto
                        </button>

                    </div>
                ) : (
                    <DashboardComponent dashboardData={data} />
                )}

            </div>
        </>
    );
}

export default Dashboard;