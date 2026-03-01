import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ResponseAPI from "../../components/ui/response-api";

function CriarConta() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/auth/register", {
                name,
                email,
                password
            });

            // Depois de registrar já faz login automático
            const login = await api.post("/api/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", login.data.token);
            navigate("/produtos");

        } catch (error) {
            setResponseTitle("Erro", error);
            setResponseMessage("Erro ao criar conta.");
            setShowModal(true);
        }
    };

    return (
        <>
            <div className="flex min-h-screen bg-gradient-br from-purple-900 via-purple-700 to-indigo-900 items-center justify-center px-4">
                <div className="flex w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white">

                    <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-br from-purple-600 via-violet-600 to-indigo-600 p-10 text-white">
                        <h2 className="text-5xl font-bold mb-4">Hypersoft</h2>
                        <p className="text-lg opacity-90 text-center">
                            Crie sua conta e comece a gerenciar seus produtos agora.
                        </p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col w-full lg:w-1/2 p-10 gap-4"
                    >
                        <h1 className="text-4xl font-bold text-purple-700">
                            Criar Conta 🚀
                        </h1>

                        <input
                            type="text"
                            value={name}
                            autoComplete="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <input
                            type="email"
                            value={email}
                            autoComplete="username"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu email"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <input
                            type="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Crie uma senha"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg mt-4 shadow-lg"
                        >
                            Criar Conta
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-purple-600 hover:underline text-sm mt-2"
                        >
                            Já tem conta? Fazer login
                        </button>
                    </form>
                </div>
            </div>

            <ResponseAPI
                open={showModal}
                onClose={() => setShowModal(false)}
                title={responseTitle}
                message={responseMessage}
            />
        </>
    );
}

export default CriarConta;