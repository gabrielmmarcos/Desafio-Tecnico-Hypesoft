import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/layout/navbar";
import ResponseAPI from "../../components/ui/response-api";
import ConfirmModal from "../../components/ui/confirm-modal";
import { Package, ArrowLeft, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function VerProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState(null);
    const [categoriaNome, setCategoriaNome] = useState("-");
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [estoque, setEstoque] = useState(0);
    const [loading, setLoading] = useState(true);

    const [modalAberto, setModalAberto] = useState(false);
    const [tipo, setTipo] = useState("entrada");
    const [quantidadeInput, setQuantidadeInput] = useState("");

    const [responseOpen, setResponseOpen] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    // FORMATAR PREÇO
    const formatarPreco = (valor) => {
        if (!valor) return "R$ 0,00";
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    //  Carregar Produto
    const carregarProduto = useCallback(async () => {
        try {
            const res = await api.get(`/api/products/${id}`);
            setProduto(res.data);

            // Buscar categoria
            const catRes = await api.get("/api/categories");
            const categoria = catRes.data.find(c => c.id === res.data.categoryId);
            if (categoria) setCategoriaNome(categoria.name);

        } catch (error) {
            setResponseTitle("Erro", error);
            setResponseMessage("Produto não encontrado.");
            setResponseOpen(true);
        }
    }, [id]);

    //  Carregar Estoque
    const carregarEstoque = useCallback(async () => {
        try {
            const res = await api.get(`/api/stock/${id}`);
            const movimentacoesApi = res.data || [];

            setMovimentacoes(movimentacoesApi);

            const totalEntradas = movimentacoesApi
                .filter(m => m.type === "Entrada")
                .reduce((acc, m) => acc + m.quantity, 0);

            const totalSaidas = movimentacoesApi
                .filter(m => m.type === "Saida")
                .reduce((acc, m) => acc + m.quantity, 0);

            setEstoque(totalEntradas - totalSaidas);

        } catch {
            setEstoque(0);
        }
    }, [id]);

    useEffect(() => {
        async function init() {
            await carregarProduto();
            await carregarEstoque();
            setLoading(false);
        }
        init();
    }, [carregarProduto, carregarEstoque]);

    // POST Entrada / Saída
    const handleAdd = async () => {
        if (!quantidadeInput) {
            setResponseTitle("Erro");
            setResponseMessage("Informe a quantidade.");
            setResponseOpen(true);
            return;
        }

        try {
            const endpoint =
                tipo === "entrada"
                    ? `/api/stock/entrada/${id}`
                    : `/api/stock/saida/${id}`;

            await api.post(endpoint, null, {
                params: {
                    quantity: Number(quantidadeInput)
                }
            });

            setModalAberto(false);
            setQuantidadeInput("");

            await carregarEstoque();

            setResponseTitle("Registrado!");
            setResponseMessage(
                tipo === "entrada"
                    ? "Entrada registrada!"
                    : "Saída registrada!"
            );
            setResponseOpen(true);

        } catch (error) {
            setResponseTitle("Erro", error);
            setResponseMessage("Erro ao registrar movimentação.");
            setResponseOpen(true);
        }
    };

    // DELETE Produto
    const handleDelete = async () => {
        try {
            await api.delete(`/api/products/${id}`);
            setResponseTitle("Sucesso!");
            setResponseMessage("Produto removido com sucesso!.");
            setResponseOpen(true);
        } catch {
            setResponseTitle("Erro");
            setResponseMessage("Erro ao remover.");
            setResponseOpen(true);
        }
    };

    if (loading) return <><Navbar /><div className="ml-64 p-10">Carregando...</div></>;

    return (
        <>
            <Navbar />

            <div className="ml-64 p-10 bg-gray-50 min-h-screen">


                {/* TOPO */}
                <div className="mb-8">

                    <button
                        onClick={() => navigate("/produtos")}
                        className="flex items-center gap-2 text-purple-600 mb-4 cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </button>

                    <div className="flex justify-between">
                        <h1 className="text-3xl md:text-4xl font-bold text-purple-800">
                            {produto?.name}
                        </h1>
                        <div className="flex gap-5">
                            <button
                                onClick={() => navigate(`/editar-produto/${id}`)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md  cursor-pointer"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-10 mb-12 h-fit">
                    <div className="bg-white p-6 rounded-xl shadow w-full">


                        <h2 className="text-2xl font-bold text-purple-700 mb-6 border-b pb-2 text-center">
                            Dados
                        </h2>


                        <div className="space-y-3 text-gray-700 grid grid-cols-2 items-center justify-center">

                            <p className="text-center font-normal text-xl">
                                <span className="flex flex-col text-center font-medium text-gray-900 text-xl">Preço:</span>{" "}
                                {formatarPreco(produto?.price)}
                            </p>

                            <p className="text-center font-normal text-xl">
                                <span className="flex flex-col text-center font-medium text-gray-900 text-xl">Categoria:</span>{" "}
                                {categoriaNome}
                            </p>

                            <p className="text-center font-normal text-xl">
                                <span className="flex flex-col text-center font-medium text-gray-900 text-xl">Descrição:</span>{" "}
                                {produto?.description}
                            </p>

                            <p className="text-center font-normal text-xl">
                                <span className="flex flex-col text-center font-medium text-gray-900 text-xl">Estoque Atual:</span>{" "}
                                {estoque} und.
                            </p>

                        </div>
                    </div>
                    <div className="bg-linear-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Package size={80} className="text-white" />
                    </div>
                </div>

                {/* BOTÕES */}
                <div className="flex flex-wrap gap-3 mb-6 justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-800">
                        Tabela de movimentações
                    </h2>
                    <div className="flex gap-5">
                        <button
                            onClick={() => { setTipo("entrada"); setModalAberto(true); }}
                            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={16} /> Entrada
                        </button>
                        <button
                            onClick={() => { setTipo("saida"); setModalAberto(true); }}
                            className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={16} /> Saída
                        </button>
                    </div>

                </div>

                {/* TABELA */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-center">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="py-3 px-4 border border-purple-400 text-center rounded-tl-lg">Tipo</th>
                                <th className="py-3 px-4 border border-purple-400 text-center">Quantidade</th>
                                <th className="py-3 px-4 border border-purple-400 text-center">Data</th>
                                <th className="py-3 px-4 border border-purple-400 text-center">Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimentacoes.length > 0 ? (
                                movimentacoes.map((m, i) => {
                                    const dataObj = new Date(m.date);

                                    return (
                                        <tr key={i} className="border border-purple-200 hover:bg-purple-50 transition">
                                            <td className={`py-3 px-4 text-center  border border-purple-100  ${m.type === "Entrada" ? "text-green-600" : "text-red-600"
                                                }`}>
                                                {m.type}
                                            </td>
                                            <td className="py-3 px-4 text-center border border-purple-100">{m.quantity}</td>
                                            <td className="py-3 px-4 text-center border border-purple-100">{dataObj.toLocaleDateString("pt-BR")}</td>
                                            <td className="py-3 px-4 text-center border border-purple-100">{dataObj.toLocaleTimeString("pt-BR")}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-gray-500">
                                        Nenhuma movimentação.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >

            {/* MODAL MOVIMENTAÇÃO */}
            {
                modalAberto && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                        <div className="bg-white p-6 rounded-xl w-80">
                            <h2 className="text-xl font-bold mb-4">
                                Nova {tipo === "entrada" ? "Entrada" : "Saída"}
                            </h2>

                            <input
                                type="number"
                                placeholder="Quantidade"
                                value={quantidadeInput}
                                onChange={(e) => setQuantidadeInput(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4"
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={handleAdd}
                                    className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={() => setModalAberto(false)}
                                    className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <ConfirmModal
                open={showConfirm}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />

            <ResponseAPI
                open={responseOpen}
                title={responseTitle}
                message={responseMessage}
                onClose={() => {
                    setResponseOpen(false);
                    if (responseTitle === "Sucesso!") navigate("/produtos");
                }}
            />
        </>
    );
}

export default VerProduto;