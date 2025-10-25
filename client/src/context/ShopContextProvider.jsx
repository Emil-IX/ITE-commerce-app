import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../api/axios"
import { useMemo } from "react"



const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {


  const [data, setData] = useState([])
  const [findText, setfindText] = useState('')
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)


  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await api.get('/products')
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getApi()
  }, [])

  const filterProducts = useMemo(() => {

    if (!findText) return data

    const findTextLowerCase = findText.toLowerCase()
    return data.filter(product =>
      product.name.toLowerCase().includes(findTextLowerCase)
    )
  }, [data, findText])

  const cutDescription = (text, lenght) => {
    if (text && text.length > lenght) {
      return text.substring(0, lenght) + '...';
    } else {
      return text
    }
  }

  useEffect(() => {
    if (cart.length > 0) {
      const newTotal = cart.reduce((acomulateTotal, product) => acomulateTotal + Number(product.price), 0)
      const roundedTotal = Number(newTotal.toFixed(2))
      setTotal(roundedTotal)
    } else {
      setTotal(0)
    }
  }, [cart])


  return (
    <ShopContext.Provider
      value={{
        data, setData,
        filterProducts,
        findText, setfindText,
        cart, setCart,
        cutDescription,
        total, setTotal
      }}>
      {children}
    </ShopContext.Provider>
  )
}


export const useShop = () => useContext(ShopContext)