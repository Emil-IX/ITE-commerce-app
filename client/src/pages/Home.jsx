import { useEffect, useState } from "react"
import { api } from "../../api/axios"



function Home() {



const [data, setData] = useState('')


useEffect(() => {

const getApi = async () => {

   const res = await api.get('/products')
   setData(res.data)
  
}

getApi()


}, [])



console.log(data)


  return (
    <>
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
    </>
  )
}


export default Home