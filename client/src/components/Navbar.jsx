import { ShoppingCart, LucideUserCircle, SearchIcon } from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { setfindText } = useShop()
    const [inputFilter, setInputFilter] = useState('')

    const handleFilter = () => {
        setfindText(inputFilter)
    }

    const handleKeyEnter = (e) => {
        if (e.key == 'Enter') {
            handleFilter()
        }
    }

    useEffect(() => {
     if(inputFilter === '') {
        setfindText('')
     }
    }, [inputFilter,setfindText])
    

    return (
        <div className="navbar">
            <p className="title">ITE-commerce</p>

            <div className="filter">
                <input
                    type="text"
                    placeholder="Search products"
                    value={inputFilter}
                    onChange={(e) => setInputFilter(e.target.value)}
                    onKeyDown={handleKeyEnter}
                />
                <button
                    type="button"
                    onClick={handleFilter}
                >
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
