import { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import { Package, Plus } from "lucide-react";
import api from "../../api/api";
import ItemCard from "../../components/layout/cards-home";

function Produtos() {
    const [userName, setUserName] = useState("Carregando...");
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");

    // botao de pesquisa    
    const produtosFiltrados = produtos.filter((produto) =>
        produto.name.toLowerCase().includes(busca.toLowerCase())
    );
    // Buscar usuário
    useEffect(() => {
        async function carregarUsuario() {
            try {
                const response = await api.get("/api/auth/me");
                setUserName(response.data.name || "Usuário");
            } catch {
                setUserName("Usuário");
            }
        }

        carregarUsuario();
    }, []);

    // Buscar produtos
    useEffect(() => {
        async function carregarProdutos() {
            try {
                const response = await api.get("/api/Products");
                setProdutos(response.data || []);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setLoading(false);
            }
        }

        carregarProdutos();
    }, []);

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-col flex-1 min-h-screen  px-6 py-24 lg:py-10 ml-0 lg:ml-62.5 relative">

                {/*  Header */}

                <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">

                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                            Bem-vindo, <span className="text-purple-600">{userName}</span>
                        </h1>

                        <h2 className="text-lg text-gray-600">
                            Gerencie todos os seus produtos cadastrados
                        </h2>
                    </div>

                    {/* pesquisa */}
                    <input
                        type="text"
                        placeholder="Pesquisar produtos..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg w-64 shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                {/*  Loading */}
                {loading ? (
                    <p className="text-center text-gray-500 mt-10">Carregando...</p>
                ) : produtos.length === 0 ? (
                    //  Nenhum produto
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <Package className="text-purple-400 w-20 h-20 mb-6" />

                        <h3 className="text-2xl font-semibold text-purple-800 mb-2">
                            Nenhum produto cadastrado
                        </h3>

                        <p className="text-gray-500 mb-6">
                            Clique no botão '+' abaixo para adicionar seu primeiro produto.
                        </p>
                    </div>
                ) : (
                    // Lista de produtos
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {produtosFiltrados.map((produto) => (
                            <ItemCard
                                key={produto.id}
                                id={produto.id}
                                nome={produto.name}
                                categoria={produto.category}
                                preco={produto.price}
                                quantidade={produto.stockQuantity}
                            />
                        ))}
                    </div>
                )}

                {/*  Botão flutuante */}
                <a
                    href="/adiciona-produto"
                    className="fixed bottom-6 right-6 bg-linear-to-br from-purple-600 to-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
                >
                    <Plus size={28} />
                </a>

            </div>
        </div>
    );
}

export default Produtos;