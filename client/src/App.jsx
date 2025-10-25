import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateLayout from './layouts/PrivateLayout'
import { ShopContextProvider } from './context/ShopContextProvider'
import Home from './pages/Home'
import Bill from './pages/Bill'


function App() {


  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Routes>

          <Route path='/' element={<PrivateLayout />}>

            <Route index element={<Home />} />
            <Route path='bill' element={<Bill />} />
          </Route>
          
        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  )
}

export default App
