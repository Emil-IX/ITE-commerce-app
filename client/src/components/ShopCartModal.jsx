import { ShoppingCart, XSquare, Trash2Icon } from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";



const ShopCartModal = ({ isOpen, onClose, children, footerButton = true }) => {

  const { cart, setCart, total } = useShop()
  const navigate = useNavigate()

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
          <ShoppingCart />
          <h2 className="cartTitle">Shopping Cart</h2>
          <button className="close-button" onClick={onClose}>
            < XSquare className="xSquare" />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
        <div className="total">
          <p>Total: ${total}</p>
        </div>

        { footerButton &&
          <div className="modal-footer">
            <p onClick={deleteAllCartItem}
            >
              Clean list <Trash2Icon className="trashIcon" />
            </p>
            <button
              onClick={() => navigate('bill')}
              disabled={!cart.length}
            >
              Proceed to checkout</button>
          </div>

        }
      </div>
    </div>
  );
};

export default ShopCartModal;