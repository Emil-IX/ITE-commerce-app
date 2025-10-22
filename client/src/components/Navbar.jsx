import { ShoppingCart, LucideUserCircle, Search, UserIcon, UserCircleIcon } from "lucide-react";

export default function Navbar() {
    return (
        <div className="navbar">
            <p className="title">The RightOne</p>

            <div className="filter">
                <input type="text" />
                <button type="button">
                    <Search className="searchIcon" />
                </button>
            </div>


            <div className="welcome">
                <ShoppingCart className="ShoppingCart" />
                <p>Hello, Marcia </p>
                <LucideUserCircle className="user" />
            </div>
        </div>
    )
}
