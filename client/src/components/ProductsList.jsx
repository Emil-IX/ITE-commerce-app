import { useShop } from '../context/ShopContextProvider'
import { useNavigate } from 'react-router-dom'

export default function ProductsList() {
  const { filterProducts, cart, setCart, cutDescription } = useShop()

  const navigate = useNavigate()

  const findProduct = (id, sendCart = null) => {
    const result = filterProducts.find(product => product.id === id)
    setCart(prevCart => {
      const existingItem = prevCart.some(product => product.id === id)
      if (existingItem) {
        return prevCart
      }

      return [...prevCart, result]
    })

    if (sendCart) {
      navigate('bill')
    }

  }

  return (
    <div className="container-xl">
      {filterProducts && filterProducts.map(product => (
        <div key={product.id} className="card">
          <h1>{cutDescription(product.name, 50)}</h1>
          <div className='card_images'>
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
