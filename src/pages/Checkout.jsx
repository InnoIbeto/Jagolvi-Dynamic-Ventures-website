import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'
import { useAuth } from '../context/AuthContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cart, getCartTotal, getCartCount, updateQuantity, removeFromCart } = useCart()
  const { formatCurrency } = useInventory()

  const total = getCartTotal()

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate('/pages/login', { state: { from: '/pages/checkout' } })
      return
    }
    navigate('/pages/payment')
  }

  const handleContinueShopping = () => {
    navigate('/pages/products')
  }

  if (cart.length === 0) {
    return (
      <main className="container py-5 min-vh-100">
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
          <h4 className="fw-bold">Your cart is empty</h4>
          <p className="text-muted mb-4">Add some products to your cart to proceed</p>
          <button className="btn btn-primary" onClick={handleContinueShopping}>
            Browse Products
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-5 min-vh-100">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Checkout</h1>
        <p className="text-muted">Review your order before proceeding to payment</p>
      </div>

      <div className="row g-4 checkout-row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm checkout-card" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">
                <i className="bi bi-basket me-2"></i>
                Order Summary ({getCartCount()} items)
              </h5>

              <div className="d-flex flex-column gap-3">
                {cart.map(item => (
                  <div key={item.id} className="d-flex gap-2 pb-3 border-bottom">
                    <div
                      className="bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '65px', height: '65px', minWidth: '65px', borderRadius: '0.5rem', overflow: 'hidden' }}
                    >
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <i className="bi bi-image text-muted fs-4"></i>
                      )}
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <div className="min-width-0 me-1">
                          <h6 className="mb-1 text-truncate" style={{ fontSize: '0.9rem' }}>{item.name}</h6>
                          <span className="badge bg-light text-dark" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                        </div>
                        <button
                          className="btn btn-sm text-danger flex-shrink-0 checkout-delete-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-1">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            style={{ padding: '0.1rem 0.4rem' }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="px-1 fw-medium" style={{ fontSize: '0.85rem' }}>{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            style={{ padding: '0.1rem 0.4rem' }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                        <span className="fw-bold text-primary text-nowrap ms-1 checkout-item-price">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button className="btn btn-outline-primary" onClick={handleContinueShopping}>
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm checkout-card" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-3 p-md-4">
              <h5 className="fw-bold mb-3 mb-md-4">
                <i className="bi bi-receipt me-2"></i>
                Payment Details
              </h5>

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.9rem' }}>
                <span className="text-muted">Subtotal</span>
                <span className="text-nowrap">{formatCurrency(getCartTotal())}</span>
              </div>

              <hr className="my-2" />
              <div className="d-flex justify-content-between mb-3 mb-md-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5 fs-md-4 text-primary text-nowrap">{formatCurrency(total)}</span>
              </div>

              <button
                className="btn btn-primary w-100 py-2 py-md-3 fw-bold"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>

              <p className="text-muted small text-center mt-2 mt-md-3 mb-0">
                <i className="bi bi-shield-check me-1"></i>
                Secure checkout - Your payment info is safe
              </p>
            </div>
          </div>

          <div className="card border-0 bg-light mt-4" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-truck me-2"></i>
                Delivery Information
              </h6>
              <p className="text-muted small mb-0">
                Delivery details and options will be confirmed after payment is processed. Our team will contact you to arrange delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
