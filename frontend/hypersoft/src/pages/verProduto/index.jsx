import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import ResponseAPI from "../../components/ui/response-api";
import ConfirmModal from "../../components/ui/confirm-modal";
import { Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function VerProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);

    const [responseOpen, setResponseOpen] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);

    // GET Produto
    useEffect(() => {
        async function carregarProduto() {
            try {
                const response = await api.get(`/api/Products/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error(error);
                setResponseTitle("Erro");
                setResponseMessage("Produto não encontrado.");
                setResponseOpen(true);
            } finally {
                setLoading(false);
            }
        }

        carregarProduto();
    }, [id]);

    // DELETE Produto
    const handleDelete = async () => {
        try {
            await api.delete(`/api/Products/${id}`);
            setResponseTitle("Sucesso!");
            setResponseMessage("Produto removido com sucesso!");
            setResponseOpen(true);
        } catch (error) {
            console.error(error);
            setResponseTitle("Erro");
            setResponseMessage("Erro ao remover produto.");
            setResponseOpen(true);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="ml-64 p-10">Carregando...</div>
            </>
        );
    }

    if (!produto) {
        return (
            <>
                <Navbar />
                <div className="ml-64 p-10">Produto não encontrado.</div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="ml-64 p-10 bg-gray-50 min-h-screen flex flex-col items-center">

                {/* TOPO - Nome + Botões */}
                <div className="flex w-full justify-between items-center mb-16 max-w-250">


                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="flex flex-col lg:flex-row-reverse gap-50 w-full max-w-250 justify-center items-center">

                    {/* IMAGEM  */}
                    <div className="flex bg-linear-to-br from-purple-600 via-violet-600 to-indigo-600 rounded-xl w-full lg:w-96 h-56 lg:h-100 items-center justify-center shadow-lg">
                        <Package size={100} className="text-white" />
                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="flex flex-col w-fit gap-8 ">

                        <div className="grid grid-cols-1  gap-3">
                            <h1 className="text-4xl font-bold text-purple-800 pb-9">
                                {produto.name}
                            </h1>


                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                                    Preço
                                </h3>
                                <p className="text-xl text-gray-800 font-semibold">
                                    R$ {Number(produto.price).toFixed(2)}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                                    Categoria
                                </h3>
                                <p className="text-lg text-gray-800">
                                    {produto.category}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                                    Estoque
                                </h3>
                                <p className="text-lg text-gray-800">
                                    {produto.stockQuantity}
                                </p>
                            </div>



                            <div className="flex gap-3 pt-10">

                                <button
                                    onClick={() => navigate(`/editar-produto/${id}`)}
                                    className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                                >
                                    Deletar
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* CONFIRM DELETE */}
            <ConfirmModal
                open={showConfirm}
                onConfirm={() => {
                    setShowConfirm(false);
                    handleDelete();
                }}
                onCancel={() => setShowConfirm(false)}
            />

            {/* RESPONSE MODAL */}
            <ResponseAPI
                open={responseOpen}
                title={responseTitle}
                message={responseMessage}
                onClose={() => {
                    setResponseOpen(false);
                    if (responseTitle === "Sucesso!") {
                        navigate("/produtos");
                    }
                }}
            />
        </>
    );
}

export default VerProduto;