import { useShop } from '../context/ShopContextProvider'

function Bill() {

  const { total, cart } = useShop()


  return (
    <div className='fatherBillContainer'>
      <div className='billContainer'>
        <h3>Consultation Fee</h3>
        <div className='billContainer_text'>
          <p>
            Personalized care and guidance tailored to your needs by our experienced specialist.
          </p>
          <p>Items ({cart.length})</p>
          <p>Code: - - -</p>
        </div>
        <div className='billContainer_total'>
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
    </div>
  )
}

export default Bill