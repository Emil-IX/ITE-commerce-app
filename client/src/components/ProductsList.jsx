import { useShop } from '../context/ShopContextProvider'

export default function ProductsList() {
  const { filterProducts, cart, setCart } = useShop()

  const cutDescription = (text, lenght) => {
    if (text && text.length > lenght) {
      return text.substring(0, lenght) + '...';
    } else {
      return text
    }
  }

  const findProduct = (id) => {
    const result = filterProducts.find(product => product.id === id)
    setCart([...cart, result])
  }

  return (
    <div className="container-xl">
      {filterProducts && filterProducts.map(product => (
        <div key={product.id} className="card">
          <h1>{cutDescription(product.name, 50)}</h1>
          <img src={product.image_url} alt="" />
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
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
