import { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import api from "../../api/api";
import ItemCard from "../../components/layout/cards-home";
import { Package } from "lucide-react";

function Categoria() {
    const [categories, setCategories] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
    const [loading, setLoading] = useState(true);
    const [contagem, setContagem] = useState({});

    // Buscar categorias
    useEffect(() => {
        async function carregarCategorias() {
            try {
                const response = await api.get("/api/categories");
                setCategories(response.data || []);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }

        carregarCategorias();
        buscarTodosProdutos();
    }, []);

    // Buscar todos produtos
    const buscarTodosProdutos = async () => {
        try {
            setLoading(true);
            setCategoriaAtiva("todos");

            const response = await api.get("/api/products");
            const produtosData = response.data || [];

            setProdutos(produtosData);

            // contar produtos por categoria
            const contador = {};
            produtosData.forEach((p) => {
                contador[p.categoryId] = (contador[p.categoryId] || 0) + 1;
            });

            setContagem(contador);

        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Buscar por categoria
    const buscarPorCategoria = async (id) => {
        try {
            setLoading(true);
            setCategoriaAtiva(id);

            const response = await api.get(`/api/categories/${id}`);
            setProdutos(response.data || []);
        } catch (error) {
            console.error("Erro ao carregar categoria:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-col flex-1 min-h-screen w-full px-6 py-24 lg:py-10 ml-0 lg:ml-62.5">

                {/*  Título */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-5xl font-bold">
                        Categorias
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Filtre os produtos por categoria
                    </p>
                </div>

                {/*  Filtros estilo app  */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide w-full px-4">

                    {/* BOTÃO TODOS */}
                    <button
                        onClick={buscarTodosProdutos}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                        ${categoriaAtiva === "todos"
                                ? "bg-purple-600 text-white shadow-lg scale-105"
                                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                            }`}
                    >
                        Todos
                        <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                            {produtos.length}
                        </span>
                    </button>

                    {categories.map((categoria) => (
                        <button
                            key={categoria.id}
                            onClick={() => buscarPorCategoria(categoria.id)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                            ${categoriaAtiva === categoria.id
                                    ? "bg-purple-600 text-white shadow-lg scale-105"
                                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                }`}
                        >
                            {categoria.name}
                            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                                {contagem[categoria.id] || 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/*  Conteúdo */}
                {loading ? (
                    // Skeleton loading moderno
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-2xl shadow animate-pulse"
                            >
                                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                                <div className="h-8 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : produtos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                        <Package className="text-purple-400 w-20 h-20 mb-6" />
                        <h3 className="text-2xl font-semibold text-purple-800">
                            Nenhum produto encontrado
                        </h3>
                    </div>
                ) : (
                    //  Animação suave nos cards
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
                        {produtos.map((produto) => (
                            <div
                                key={produto.id}
                                className="transform transition-all duration-500 hover:scale-105"
                            >
                                <ItemCard
                                    id={produto.id}
                                    name={produto.name}
                                    description={produto.description}
                                    price={produto.price}
                                    categoryName={
                                        categories.find(c => c.id === produto.categoryId)?.name
                                    }
                                    stockQuantity={produto.stockQuantity}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Categoria;