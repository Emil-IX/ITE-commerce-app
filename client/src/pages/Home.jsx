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
        <div>
            {data &&  data.map(product =>(
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <img src={product.image_url} alt="" />
                    <p>{product.price}</p>
                    <p>{product.stock}</p>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    </>
  )
}


export default Home