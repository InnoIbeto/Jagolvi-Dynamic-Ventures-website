import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AuthCallback from './pages/AuthCallback'
import { InventoryProvider } from './context/InventoryContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

const ProtectedAdminRoute = ({ children }) => {
  const { user, profile, loading, profileLoading, profileChecked } = useAuth()
  
  if (loading || (user && (!profileChecked || profileLoading))) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/pages/login" replace />
  }

  if (!profile) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="text-danger">Profile Missing</h2>
          <p className="text-muted">We couldn't find a profile for this account.</p>
        </div>
      </main>
    )
  }

  if (profile?.role !== 'admin') {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="text-danger">Access Denied</h2>
          <p className="text-muted">You don't have permission to access this page.</p>
        </div>
      </main>
    )
  }

  return children
}

const AuthRoute = ({ children }) => {
  const { user, profile, loading, profileLoading, profileChecked } = useAuth()
  
  if (loading || (user && (!profileChecked || profileLoading))) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    )
  }

  if (user) {
    return <Navigate to="/pages/products" replace />
  }

  return children
}

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AuthProvider>
          <InventoryProvider>
            <Router>
              <div className="app-container">
                <Navbar />
                <Cart />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pages/about" element={<About />} />
                  <Route path="/pages/contact" element={<Contact />} />
                  <Route path="/pages/products" element={<Products />} />
                  <Route path="/pages/checkout" element={<Checkout />} />
                  <Route path="/pages/payment" element={<Payment />} />
                  
                  {/* Auth Routes */}
                  <Route path="/pages/login" element={<AuthRoute><Login /></AuthRoute>} />
                  <Route path="/pages/signup" element={<AuthRoute><Signup /></AuthRoute>} />
                  <Route path="/pages/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
                  <Route path="/pages/reset-password" element={<ResetPassword />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  
                  {/* Protected Admin Route */}
                  <Route path="/pages/admin" element={
                    <ProtectedAdminRoute>
                      <Admin />
                    </ProtectedAdminRoute>
                  } />
                </Routes>
                <Footer />
              </div>
            </Router>
          </InventoryProvider>
        </AuthProvider>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
