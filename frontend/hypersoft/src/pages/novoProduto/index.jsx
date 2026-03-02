import React, { useState, useEffect } from "react";
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
        categoryId: "",
        stockQuantity: "",
    });

    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    // busca categorias
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias", error);
        }
    };

    // criar categoria

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;

        try {
            const response = await api.post("/api/categories", null, {
                params: { name: newCategoryName }
            });

            const createdCategory = response.data;

            await fetchCategories();

            // Auto selecionar categoria recém criada
            setFormData(prev => ({
                ...prev,
                categoryId: createdCategory.id
            }));

            setNewCategoryName("");
            setShowCategoryModal(false);

        } catch (error) {
            console.error("Erro ao criar categoria", error);
        }
    };

    // Handle Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Criar Produto + Entrada Estoque

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Criar Produto
            const productResponse = await api.post("/api/products", null, {
                params: {
                    name: formData.name,
                    description: formData.description,
                    price: Number(formData.price),
                    categoryId: formData.categoryId,
                }
            });

            const productId = productResponse.data;

            if (!productId) {
                throw new Error("Produto não retornou ID");
            }

            // Entrada de estoque
            await api.post(`/api/stock/entrada/${productId}`, null, {
                params: {
                    quantity: Number(formData.stockQuantity)
                }
            });

            setResponseTitle("Sucesso!");
            setResponseMessage("Produto criado e estoque atualizado.");
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

            <div className="flex flex-1 min-h-screen px-6 py-24 lg:py-10 ml-0 lg:ml-62.5">
                <div className="w-full flex flex-col items-center gap-5">

                    <h1 className="text-3xl lg:text-5xl font-bold text-purple-800 mb-10 text-center">
                        Adicionar Produto
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-xl flex flex-col gap-4"
                    >
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nome do Produto
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Descrição
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Preço */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Preço (und)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Categoria
                            </label>

                            <div className="flex gap-2">
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(true)}
                                    className="bg-purple-600 text-white px-4 rounded-lg cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Estoque */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Quantidade em Estoque
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex justify-between pt-4 gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/produtos")}
                                className="flex items-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-100 cursor-pointer"
                            >
                                <ArrowLeft size={18} />
                                Voltar
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "Salvando..." : "Salvar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal Criar Categoria */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>

                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nome da categoria"
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowCategoryModal(false)}
                                className="px-4 py-2 border rounded-lg cursor-pointer"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleCreateCategory}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Resposta */}
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