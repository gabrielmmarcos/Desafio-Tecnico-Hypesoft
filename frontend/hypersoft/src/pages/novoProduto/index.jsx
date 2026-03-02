import React, { useState } from "react";
import Navbar from "../../components/layout/navbar";
import ResponseAPI from "../../components/ui/response-api";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AddProduto() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
    });

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const produto = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                stockQuantity: Number(formData.stockQuantity),
            };

            await api.post("/api/products", produto);

            setResponseTitle("Sucesso!");
            setResponseMessage("Produto salvo com sucesso.");
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao salvar produto:", error);

            setResponseTitle("Erro");
            setResponseMessage("Não foi possível salvar o produto.");
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-1 min-h-screen  px-6 py-24 lg:py-10 ml-0 lg:ml-62.5">

                <div className="w-full flex flex-col items-center gap-5">

                    <h1 className="text-3xl lg:text-5xl font-bold text-purple-800 mb-10 text-center">
                        Adicionar Produto
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-xl flex flex-col gap-2.5"
                    >
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome do Produto
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ex: Coca-Cola 2L"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descrição
                            </label>
                            <textarea
                                name="description"
                                placeholder="Descreva o produto..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Preço */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preço
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                placeholder="Ex: 8.99"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoria
                            </label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Ex: Bebidas"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Quantidade */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantidade em Estoque
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                placeholder="Ex: 50"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex justify-between pt-4 gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/produtos")}
                                className="flex items-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-100 transition cursor-pointer"
                            >
                                <ArrowLeft size={18} />
                                Voltar
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "Salvando..." : "Salvar"}
                            </button>

                        </div>
                    </form>

                </div>
            </div>

            {/* Modal ResponseAPI */}
            <ResponseAPI
                open={showModal}
                title={responseTitle}
                message={responseMessage}
                onClose={() => {
                    setShowModal(false);
                    if (responseTitle === "Sucesso!") {
                        navigate("/produtos");
                    }
                }}
            />
        </div>
    );
}

export default AddProduto;