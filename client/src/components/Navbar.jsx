import { ShoppingCart, LucideUserCircle, SearchIcon, TrashIcon } from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { useEffect, useState } from "react";
import ShopCartModal from "./ShopCartModal";

export default function Navbar() {
    const { setfindText, cart,  setCart } = useShop()
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

    const deleteCartItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }

    let randonId =  Math.floor(Math.random() * 1000000) 

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
                    <div key={randonId++} className='cartItem'>
                        <img src={item.image_url} alt={item.name} />
                        <div className="cartItem_texts">
                            <p>{item.name}</p>
                            <p>{item.price} 
                                <TrashIcon 
                                className="trashIcon"
                                onClick={()=> deleteCartItem(item.id)}
                                />
                                </p>     
                        </div>
                      
                    </div>
                ))}
            </ShopCartModal>

        </div>
    )
}
