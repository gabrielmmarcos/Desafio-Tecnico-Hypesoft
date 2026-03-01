import React from "react";
import { Package } from "lucide-react";

const ItemCard = ({ id, nome, descricao, preco, categoria, quantidade }) => {

    const formatarPreco = (valor) => {
        if (!valor) return "R$ 0,00";
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl transition flex flex-col overflow-hidden">

            {/* Header Roxo */}
            <div className="bg-linear-to-br from-purple-600 to-indigo-600 p-6 flex justify-center items-center">
                <Package className="text-white w-12 h-12" />
            </div>

            {/* Conteúdo */}
            <div className="p-6 flex flex-col gap-2 flex-1">
                <h4 className="font-bold text-xl text-purple-800 uppercase">
                    {nome}
                </h4>

                <p className="text-gray-500 text-sm line-clamp-2">
                    {descricao}
                </p>

                <div className="mt-4 space-y-1 text-sm">
                    <p>
                        <span className="font-medium text-purple-700">
                            Categoria:
                        </span>{" "}
                        {categoria}
                    </p>

                    <p>
                        <span className="font-medium text-purple-700">
                            Estoque:
                        </span>{" "}
                        {quantidade}
                    </p>

                    <p className="text-lg font-bold text-indigo-700 mt-2">
                        {formatarPreco(preco)}
                    </p>
                </div>

                <a href={`/produto/${id}`} className="mt-auto">
                    <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
                        Ver Produto
                    </button>
                </a>
            </div>
        </div>
    );
};

export default ItemCard;