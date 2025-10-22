import { useShop } from '../context/ShopContextProvider'

export default function ProductsList() {
    const { data } = useShop()
  return (
    <div className="container-xl">
            {data &&  data.map(product =>(
                <div key={product.id} className="card">
                    <h1>{product.name}</h1>
                    <img src={product.image_url} alt="" />
                    <p className="price">${product.price}</p>
                    <p><strong>Stock: </strong>{product.stock}</p>
                    <p><strong>Description: </strong>{product.description}</p>
                </div>
            ))}
        </div>
  )
}
