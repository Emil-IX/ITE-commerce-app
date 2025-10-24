import { ShoppingCart, LucideUserCircle, SearchIcon } from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { useEffect, useState } from "react";
import ShopCartModal from "./ShopCartModal";

export default function Navbar() {
    const { setfindText, cart } = useShop()
    const [inputFilter, setInputFilter] = useState('')
    const [isCartOpen, setIsCartOpen] = useState(false);



    const handleFilter = () => {
        setfindText(inputFilter)
    }

    const handleKeyEnter = (e) => {
        if (e.key == 'Enter') {
            handleFilter()
        }
    }

    useEffect(() => {
        if (inputFilter === '') {
            setfindText('')
        }
    }, [inputFilter, setfindText])

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);


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
                <ShoppingCart
                    className="ShoppingCart"
                    onClick={openCart}
                />
                <p>Hello, Marcia </p>
                <LucideUserCircle className="user" />
            </div>

            <ShopCartModal isOpen={isCartOpen} onClose={closeCart} >
                {cart && cart.map(item => (
                    <div key={item.id} className='cartItem'>
                        <img src={item.image_url} alt={item.name} />
                        <div className="cartItem_texts">
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                        </div>
                    </div>
                ))}
            </ShopCartModal>

        </div>
    )
}
