import { createContext, useContext, useEffect, useState } from "react"
import{ api } from "../api/axios"



const ShopContext = createContext()

export const  ShopContextProvider = ({ children }) => {


    const [data, setData] = useState('')


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



    return (
        <ShopContext.Provider value={{ data, setData }}>
            {children}
        </ShopContext.Provider>
    )
}


export const useShop = () => useContext(ShopContext)