import { ShoppingCart, XSquare, Trash2Icon  } from "lucide-react";
import { useShop } from "../context/ShopContextProvider";



const ShopCartModal = ({ isOpen, onClose, children }) => {

    const {setCart, total} = useShop()

     const deleteAllCartItem = () => {
        setCart([]);
    }

 

  if (!isOpen) {
    return null;
  }

  return (

    <div className="modal-overlay" onClick={onClose}>

      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <ShoppingCart/>
          <h2 className="cartTitle">Shopping Cart</h2>
          <button className="close-button" onClick={onClose}>
             < XSquare className="xSquare" />
          </button>
        </div>
        
        <div className="modal-body">
          {children} 
        </div>
          <div className="total">
            <p>Total: {total}</p>
          </div>

        <div className="modal-footer">
          <p onClick={deleteAllCartItem}
          >
            Clean list <Trash2Icon    className="trashIcon"/>
          </p>
          <button >Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShopCartModal;