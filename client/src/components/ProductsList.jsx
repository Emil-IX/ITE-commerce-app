import { useShop } from '../context/ShopContextProvider'

export default function ProductsList() {
    const { data , filterProducts } = useShop()
   
  const cutDescription = (text, lenght) => {
    if(text && text.length > lenght){
      return text.substring(0, lenght) + '...';
    } else {
      return text
    }
  }

  return (
    <div className="container-xl">
            {filterProducts &&  filterProducts.map(product =>(
                <div key={product.id} className="card">
                    <h1>{product.name}</h1>
                    <img src={product.image_url} alt="" />
                    <p className="price">${product.price}</p>
                    <p><strong>Stock: </strong>{product.stock}</p>
                    <p><strong>Description: </strong>{cutDescription(product.description, 60)}</p>
                </div>
            ))}
        </div>
  )
}
