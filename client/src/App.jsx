import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import PrivateLayout from './layouts/PrivateLayout'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateLayout />}>

          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
