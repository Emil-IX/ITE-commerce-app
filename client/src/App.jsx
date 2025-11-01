import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateLayout from './layouts/PrivateLayout'
import { ShopContextProvider } from './context/ShopContextProvider'
import Home from './pages/Home'
import Bill from './pages/Bill'
import ProdutsDetails from './pages/ProdutsDetails'


function App() {


  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Routes>

          <Route path='/' element={<PrivateLayout />}>
            <Route index element={<Home />} />
            <Route path='products/:id' element={<ProdutsDetails />} />
          </Route>

          <Route path='bill' element={<Bill />} />

        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  )
}

export default App
