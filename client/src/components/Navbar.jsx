import { ShoppingCart, LucideUserCircle, SearchIcon } from "lucide-react";

export default function Navbar() {
    return (
        <div className="navbar">
            <p className="title">ITE-commerce</p>

            <div className="filter">
                <input type="text" />
                <button type="button">
                    <SearchIcon className="searchIcon" />
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
