import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { data, useNavigate, useParams } from 'react-router-dom'
import { useShop } from '../context/ShopContextProvider'

function ProdutsDetails() {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)

    const { filterProducts, setCart, cutDescription } = useShop()
    const navigate = useNavigate()


    useEffect(() => {
        const getProductsDetails = async (id) => {
            try {
                setLoading(true)
                const res = await api.get(`/products/${id}`)
                setProduct(res.data[0])
                console.log(res.data[0])
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        getProductsDetails(id)
    }, [id])


    if (loading) {
        return <div>Loading product...</div>
    }

    if (!product) {
        return <div>Product not faund</div>
    }

    console.log(product.name)




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
            navigate('/bill')
        }

    }


    return (

        <div className='detailContainer'>
            <div className='picture'>
                <img src={product.image_url} alt={product.name} />
            </div>

            <div className='mainContent'>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>Category: <span>{product.category}</span> </p>
                <h3>${product.price}</h3>
            </div>

            <div className='buttonContent_main_detail'>
                <h4>${product.price}</h4>
                <p>Stock: {product.stock}</p>
                <button
                    className='shopButton_details'
                    type='button'
                    onClick={() => findProduct(product.id)}
                >
                    Add to Cart
                </button>
                <button
                    className='shopButtonBuyNow_details'
                    type='button'
                    onClick={() => findProduct(product.id, true)}
                >
                    Buy Now
                </button>
            </div>

        </div>

    )
}

export default ProdutsDetails