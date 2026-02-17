import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import './App.css'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pages/about" element={<About />} />
                    <Route path="/pages/contact" element={<Contact />} />
                    <Route path="/pages/products" element={<Products />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
