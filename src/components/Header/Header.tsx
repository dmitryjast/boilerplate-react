import { Link, useNavigate } from "react-router-dom";

import Logo from "./Logo";

import "./Header.scss";

export default function Header() {
    return(
        <header className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-22">
                    <Logo />
                
                </div>
            </div>
        </header>
        )
}