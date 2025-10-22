import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateLayout from './layouts/PrivateLayout'
import { ShopContextProvider } from './context/ShopContextProvider'
import Home from './pages/Home'


function App() {


  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Routes>

          <Route path='/' element={<PrivateLayout />}>

            <Route path='/' element={<Home />} />
          </Route>
          
        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  )
}

export default App
