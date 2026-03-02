import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import ResponseAPI from "../../components/ui//response-api";
import { Package } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        name: "",
        price: "",
        category: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    // GET Produto por ID
    useEffect(() => {
        async function carregarProduto() {
            try {
                const response = await api.get(`/api/Products/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
                setResponseTitle("Erro");
                setResponseMessage("Erro ao carregar produto.");
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        }

        carregarProduto();
    }, [id]);

    //  PUT Produto
    const handleSalvar = async () => {
        try {
            setSaving(true);

            const body = {
                name: produto.name,
                price: Number(produto.price),
                category: produto.category,
            };

            await api.put(`/api/Products/${id}`, body);

            setResponseTitle("Sucesso!");
            setResponseMessage("Produto atualizado com sucesso!");
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            setResponseTitle("Erro");
            setResponseMessage("Erro ao atualizar produto.");
            setShowModal(true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className="flex w-full">
                <Navbar />

                <div className="flex flex-1 min-h-screen w-full ml-0 lg:ml-62.5 px-6 py-20  justify-center items-center ">

                    {loading ? (
                        <p className="text-purple-700 text-lg">Carregando...</p>
                    ) : (

                        <div className=" w-full max-w-5xl flex  justify-center items-center">



                            {/* Formulário */}
                            <div className="flex flex-col justify-center w-full lg:w-1/2 p-10 space-y-6">

                                <h1 className="text-4xl font-bold text-purple-800 text-center">
                                    Editar Produto
                                </h1>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nome do produto"
                                        value={produto.name}
                                        onChange={(e) =>
                                            setProduto({ ...produto, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Preço (Ex: 9.99)"
                                        value={produto.price}
                                        onChange={(e) =>
                                            setProduto({ ...produto, price: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Categoria
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Categoria"
                                        value={produto.category}
                                        onChange={(e) =>
                                            setProduto({ ...produto, category: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                </div>

                                <div className="flex flex-col gap-3 pt-4">

                                    <button
                                        onClick={handleSalvar}
                                        disabled={saving}
                                        className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
                                    >
                                        {saving ? "Salvando..." : "Salvar Alterações"}
                                    </button>

                                    <button
                                        onClick={() => navigate(`/produto/${id}`)}
                                        className="border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition cursor-pointer"
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            </div>
                        </div>

                    )}

                </div>
            </div>

            {/* Modal Resposta */}
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