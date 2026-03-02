import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Dashboard = ({ dashboardData }) => {

    const data = [
        {
            name: "Produtos",
            value: dashboardData.totalProducts
        },
        {
            name: "Categorias",
            value: dashboardData.totalCategories
        },
        {
            name: "Itens em Estoque",
            value: dashboardData.totalItemsInStock
        }
    ];

    return (
        <div className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Visão Geral
            </h2>

            {/*  GRÁFICO */}
            <div className="w-full h-80 mb-10 bg-gray-50 rounded-2xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 40, left: 40, bottom: 10 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: "#6B7280", fontSize: 14 }}
                        />
                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill="#7C3AED"
                            radius={[0, 12, 12, 0]}
                            barSize={28}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/*  CARDS*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Produtos */}
                <div className="bg-purple-50 rounded-xl p-5 shadow">
                    <p className="text-gray-500 text-sm">Total de Produtos</p>
                    <h3 className="text-3xl font-bold text-purple-600 mt-2">
                        {dashboardData.totalProducts}
                    </h3>
                </div>

                {/* Total Categorias */}
                <div className="bg-blue-50 rounded-xl p-5 shadow">
                    <p className="text-gray-500 text-sm">Total de Categorias</p>
                    <h3 className="text-3xl font-bold text-blue-600 mt-2">
                        {dashboardData.totalCategories}
                    </h3>
                </div>

                {/* Itens em Estoque */}
                <div className="bg-green-50 rounded-xl p-5 shadow">
                    <p className="text-gray-500 text-sm">Itens em Estoque</p>
                    <h3 className="text-3xl font-bold text-green-600 mt-2">
                        {dashboardData.totalItemsInStock}
                    </h3>
                </div>

                {/* Valor Total Estoque */}
                <div className="bg-yellow-50 rounded-xl p-5 shadow">
                    <p className="text-gray-500 text-sm">Valor Total do Estoque</p>
                    <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                        R$ {dashboardData.totalStockValue?.toLocaleString("pt-BR")}
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;