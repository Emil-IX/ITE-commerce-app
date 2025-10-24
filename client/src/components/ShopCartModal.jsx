import { ShoppingCart, XSquare } from "lucide-react";



const ShopCartModal = ({ isOpen, onClose, children }) => {

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

        <div className="modal-footer">
          <button>Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default ShopCartModal;