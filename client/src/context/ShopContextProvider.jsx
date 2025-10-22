import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../api/axios"
import { useMemo } from "react"



const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {


    const [data, setData] = useState([])
    const [findText, setfindText] = useState('')


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
    },[data, findText])



    return (
        <ShopContext.Provider value={{ data, setData, filterProducts, findText, setfindText }}>
            {children}
        </ShopContext.Provider>
    )
}


export const useShop = () => useContext(ShopContext)