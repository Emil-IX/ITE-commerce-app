import { ShoppingCart, LucideUserCircle, SearchIcon, Trash2Icon } from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { useEffect, useState } from "react";
import ShopCartModal from "./ShopCartModal";

export default function Navbar({ filterApply = true }) {
    const { setfindText, cart, setCart, cutDescription } = useShop()
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

    let randonId = Math.floor(Math.random() * 1000000)

    return (
        <div className="navbar">
            <p className="title">ITE-commerce</p>

            {filterApply ?
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
                : <div className="secureCheckoutTitle"><p>Secure checkout</p></div>
            }


            <div className="welcome">
                <ShoppingCart
                    className="ShoppingCart"
                    onClick={openCart}
                />
                <p>Hello, Marcia </p>
                <LucideUserCircle className="user" />
            </div>

            <ShopCartModal isOpen={isCartOpen} onClose={closeCart} footerButton={filterApply} >
                {cart && cart.map(item => (
                    <div key={randonId++} className='cartItem'>
                        <div>
                            <img src={item.image_url} alt={item.name} />
                        </div>
                        <div className="cartItem_texts">
                            <p>{cutDescription(item.name, 50)}</p>
                            <p>{item.price}</p>
                            {filterApply &&
                                <Trash2Icon
                                    className="trashIcon"
                                    onClick={() => deleteCartItem(item.id)}
                                />
                            }
                        </div>

                    </div>
                ))}
            </ShopCartModal>

        </div>
    )
}
