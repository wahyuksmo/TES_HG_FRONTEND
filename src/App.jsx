import { useState } from 'react'
import NavbarComponent from './components/NavbarComponent'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PembayaranPage from './pages/PembayaranPage'
import PembayaranForm from './pages/PembayaranForm'

function App() {

  return (
    <div>
        <NavbarComponent/>
        
        <Routes>
            <Route path='/' Component={HomePage}/>
            <Route path='/pembayaran' Component={PembayaranPage}/>
            <Route path='/pembayaranForm' Component={PembayaranForm}/>
        </Routes>

    </div>
  )
}

export default App
