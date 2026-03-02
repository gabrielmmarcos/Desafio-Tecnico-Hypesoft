import React from "react";
import { Package } from "lucide-react";

const ItemCard = ({
    id,
    name,
    description,
    price,
    categoryName,
    stockQuantity
}) => {

    const formatarPreco = (valor) => {
        if (!valor) return "R$ 0,00";
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl transition flex flex-col overflow-hidden">

            <div className="bg-linear-to-br from-purple-600 to-indigo-600 p-6 flex justify-center items-center h-40">
                <Package className="text-white w-12 h-12" />
            </div>


            <div className="p-6 flex flex-col gap-3 flex-1">

                <h4 className="font-bold text-xl text-purple-800 uppercase">
                    {name}
                </h4>

                <p className="text-gray-600 text-sm line-clamp-2">
                    {description}
                </p>

                <div className="mt-3 space-y-1 text-sm">

                    <p>
                        <span className="font-medium text-purple-700">
                            Categoria:
                        </span>{" "}
                        {categoryName || "Não informada"}
                    </p>

                    <p>
                        <span className="font-medium text-purple-700">
                            Estoque:
                        </span>{" "}
                        {stockQuantity}
                    </p>

                </div>

                <div className="mt-3">
                    <p className="text-xs text-gray-500">
                        Valor da unidade
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                        {formatarPreco(price)}
                    </p>
                </div>

                <a href={`/produto/${id}`} className="mt-auto">
                    <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition cursor-pointer">
                        Ver Produto
                    </button>
                </a>

            </div>
        </div>
    );
};

export default ItemCard;