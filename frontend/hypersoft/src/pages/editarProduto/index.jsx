import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import ResponseAPI from "../../components/ui//response-api";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Ajustado para refletir os campos do backend
    const [produto, setProduto] = useState({
        name: "",
        description: "", // Adicionado
        price: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        async function carregarProduto() {
            try {
                const response = await api.get(`/api/products/${id}`);
                setProduto({
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                });
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
                setResponseTitle("Erro");
                setResponseMessage("Erro ao carregar os dados do produto.");
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        }
        carregarProduto();
    }, [id]);

    const handleSalvar = async () => {
        try {
            setSaving(true);

            // 2. O body deve ser EXATAMENTE o que o DTO do C# espera
            const body = {
                name: produto.name,
                description: produto.description,
                price: parseFloat(produto.price), // Garante que vai como decimal/number
            };

            await api.put(`/api/products/${id}`, body);

            setResponseTitle("Sucesso!");
            setResponseMessage("Produto atualizado com sucesso!");
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            setResponseTitle("Erro");
            setResponseMessage(error.response?.data || "Erro ao atualizar produto.");
            setShowModal(true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className="flex w-full">
                <Navbar />
                <div className="flex flex-1 min-h-screen w-full ml-0 lg:ml-62.5 px-6 py-20 justify-center items-center">
                    {loading ? (
                        <p className="text-purple-700 text-lg">Carregando...</p>
                    ) : (
                        <div className="w-full max-w-5xl flex justify-center items-center">
                            <div className="flex flex-col justify-center w-full lg:w-1/2 p-10 space-y-6 bg-white shadow-xl rounded-2xl">
                                <h1 className="text-4xl font-bold text-purple-800 text-center">
                                    Editar Produto
                                </h1>

                                <div className="space-y-4">
                                    {/* Campo Nome */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                                        <input
                                            type="text"
                                            value={produto.name}
                                            onChange={(e) => setProduto({ ...produto, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>

                                    {/* NOVO: Campo Descrição */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                        <textarea
                                            rows="3"
                                            value={produto.description}
                                            onChange={(e) => setProduto({ ...produto, description: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>

                                    {/* Campo Preço */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={produto.price}
                                            onChange={(e) => setProduto({ ...produto, price: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-4">
                                    <button
                                        onClick={handleSalvar}
                                        disabled={saving}
                                        className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 font-semibold"
                                    >
                                        {saving ? "Salvando..." : "Salvar Alterações"}
                                    </button>

                                    <button
                                        onClick={() => navigate(-1)}
                                        className="border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ResponseAPI
                open={showModal}
                title={responseTitle}
                message={responseMessage}
                onClose={() => {
                    setShowModal(false);
                    if (responseTitle === "Sucesso!") {
                        navigate(`/produto/${id}`);
                    }
                }}
            />
        </>
    );
}

export default EditarProduto;