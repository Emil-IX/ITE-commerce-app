import { useShop } from '../context/ShopContextProvider'
import { useNavigate } from 'react-router-dom'

export default function ProductsList() {
  const { filterProducts, setCart, cutDescription } = useShop()

  const navigate = useNavigate()

  const findProduct = (id, sendCart = null) => {
    const productToAdd = filterProducts.find(product => product.id === id)

    if (productToAdd.stock == 0) {
      alert('Not product available')
      return
    }

    setCart(prevCart => {

      const existingItem = prevCart.findIndex(product => product.id === id)

      if (existingItem > -1) {

        const productInCart = prevCart[existingItem];

        if (productInCart.quantity && productInCart.quantity >= productInCart.stock) {
          return prevCart
        }

        const newCart = [...prevCart]

        newCart[existingItem] = {
          ...newCart[existingItem],
          quantity: newCart[existingItem].quantity + 1
        }
        return newCart
      }


      return [...prevCart, { ...productToAdd, quantity: 1 }]
    })

    if (sendCart) {
      navigate('bill')
    }

  }

  const goDetailsProducts = (id) => {
    navigate(`products/${id}`)
  }


  return (
    <div className="container-xl">
      {filterProducts && filterProducts.map(product => (
        <div key={product.id} className="card">
          <h1>{cutDescription(product.name, 50)}</h1>
          <div
            className='card_images'
            onClick={() => goDetailsProducts(product.id)}
          >
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className='textsContent'>
            <p className="price">${product.price}</p>
            <p><strong>Stock: </strong>{product.stock}</p>
            <p><strong>Description: </strong>{cutDescription(product.description, 60)}</p>
          </div>
          <div className='buttonContent'>
            <button
              className='shopButton'
              type='button'
              onClick={() => findProduct(product.id)}
            >
              Add to Cart
            </button>
            <button
              className='shopButtonBuyNow'
              type='button'
              onClick={() => findProduct(product.id, true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
