import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Payment = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { cart, getCartTotal } = useCart()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/pages/login', { state: { from: '/pages/payment' } })
    }
  }, [user, loading, navigate])

  if (loading || !user) {
    return (
      <main className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    )
  }

  const handleGoBack = () => {
    navigate('/pages/checkout')
  }

  const handleContactUs = () => {
    navigate('/pages/contact')
  }

  return (
    <main className="container py-5 min-vh-100 d-flex align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center">
            <div 
              className="bg-warning bg-opacity-25 d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{ width: '120px', height: '120px' }}
            >
              <i className="bi bi-construct text-warning fs-1"></i>
            </div>
            
            <h2 className="fw-bold mb-3">Payment System Under Construction</h2>
            <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
              We're currently working on integrating a secure payment system to give you the best checkout experience.
            </p>

            {cart.length > 0 && (
              <div className="card border-0 shadow-sm d-inline-block mb-4" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-4">
                  <h6 className="text-muted mb-3">Your Order</h6>
                  <p className="mb-1"><strong>{cart.length} item(s)</strong> in cart</p>
                  <p className="fs-5 text-primary fw-bold mb-0">
                    Total: ₦{getCartTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <button className="btn btn-primary px-4 py-2" onClick={handleGoBack}>
                <i className="bi bi-arrow-left me-2"></i>
                Back to Checkout
              </button>
              <button className="btn btn-outline-primary px-4 py-2" onClick={handleContactUs}>
                <i className="bi bi-envelope me-2"></i>
                Contact Us for Order
              </button>
            </div>

            <div className="mt-5 pt-4 border-top">
              <p className="text-muted small mb-3">In the meantime, you can:</p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <span className="badge bg-light text-dark p-3">
                  <i className="bi bi-telephone me-2"></i>Call us for orders
                </span>
                <span className="badge bg-light text-dark p-3">
                  <i className="bi bi-whatsapp me-2"></i>Message on WhatsApp
                </span>
                <span className="badge bg-light text-dark p-3">
                  <i className="bi bi-envelope me-2"></i>Email your order
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Payment
