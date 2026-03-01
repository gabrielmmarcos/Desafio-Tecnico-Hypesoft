import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ResponseAPI from "../../components/ui/response-api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/produtos");
        } catch (error) {
            setResponseTitle("Erro", error);
            setResponseMessage("Email ou senha inválidos.");
            setShowModal(true);
        }
    };

    return (
        <>
            {/* <div className="flex   h-screen flex-col lg:flex-row-reverse items-center justify-center min-w-screen">


                

             
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col justify-center  h-full p-10 gap-4 px-10 md:px-20 lg:px-20"
                >
                    <h1 className="text-left text-4xl font-bold text-purple-700">
                        Bem-vindo
                    </h1>

                    <p className="text-left text-gray-500 mb-6">
                        Faça login para continuar
                    </p>

                    <input
                        type="text"
                        value={email}
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <input
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg mt-4 shadow-lg cursor-pointer "
                    >
                        Entrar
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/criar-conta")}
                        className="text-purple-600 hover:underline text-sm mt-2 cursor-pointer "
                    >
                        Não tem conta? Criar agora
                    </button>
                </form> */}

            <div className="flex h-screen flex-col lg:flex-row-reverse items-center justify-center">

                {/* Lado gradiente */}
                <div className="flex flex-col justify-center items-center h-1/2 w-full lg:w-1/2 lg:h-full bg-linear-to-br from-purple-600 via-violet-600 to-indigo-600 p-10  text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                        Hypersoft
                    </h2>
                    <p className="hidden md:block text-md md:text-lg opacity-90 text-center w-100">
                        Crie sua conta e comece a gerenciar seus produtos agora.
                    </p>
                </div>
                {/* Formulário */}
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col justify-center h-3/4 w-full lg:w-1/2 lg:h-full p-10 gap-4"
                >
                    <div className="flex flex-col px-5 lg:px-20 ">
                        <h1 className="text-left text-4xl font-bold text-purple-700">
                            Bem-vindo
                        </h1>

                        <p className="text-left text-gray-500 mb-6">
                            Faça login para continuar
                        </p>
                    </div>
                    <div className="flex flex-col px-5 lg:px-20">

                        <div className="grid grid-cols-1 gap-y-2 ">
                            <input
                                type="text"
                                value={email}
                                autoComplete="username"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />

                            <input
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg mt-4 shadow-lg cursor-pointer"
                        >
                            Entrar
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/criar-conta")}
                            className="text-purple-600 hover:underline text-sm mt-2 cursor-pointer"
                        >
                            Já tem conta? Fazer login
                        </button>
                    </div>
                </form>
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

export default Login;