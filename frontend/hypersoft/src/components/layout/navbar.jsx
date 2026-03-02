import React, { useState } from "react";
import {
    LayoutDashboard,
    Package,
    Tag,
    User,
    Menu,
    X,
} from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { icon: <Package size={20} />, text: "Produtos", href: "/produtos" },
        { icon: <LayoutDashboard size={20} />, text: "Dashboard", href: "/dashboard" },
        { icon: <Tag size={20} />, text: "Categorias", href: "/categoria" },
        { icon: <User size={20} />, text: "Perfil", href: "/perfil" },
    ];

    return (
        <>
            {/* Botão Mobile */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 text-purple-700 bg-white rounded-lg p-2 shadow-lg lg:hidden"
            >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Sidebar */}
            <div
                className={` z-10 fixed top-0 left-0 min-h-screen w-62 bg-linear-to-b from-purple-700 via-violet-700 to-indigo-800 flex flex-col shadow-2xl transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 pt-20 lg:pt-8 pb-6">
                    <div className="w-10 h-10 bg-linear-to-br from-purple-100 to-purple-300 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-purple-700 font-extrabold text-xl">
                            H
                        </span>
                    </div>

                    <h1 className="font-extrabold text-white text-2xl tracking-wide">
                        Hypersoft
                    </h1>
                </div>

                <hr className="border-purple-400/40 mx-6 mb-4" />

                {/* Links */}
                <nav className="flex flex-col w-full px-3 gap-1">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="group flex items-center gap-3 px-4 py-3 rounded-lg text-purple-100 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <span className="opacity-80 group-hover:opacity-100 transition">
                                {link.icon}
                            </span>
                            <span className="font-medium">
                                {link.text}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navbar;