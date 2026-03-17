import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()
  const { formatCurrency } = useInventory()

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/pages/checkout')
  }

  if (!isCartOpen) return null

  return (
    <>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style={{ zIndex: 1040, opacity: 0.5 }}
        onClick={() => setIsCartOpen(false)}
      />
      <div 
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
        style={{ zIndex: 1050, width: '100%', maxWidth: '420px', animation: 'slideInRight 0.3s ease-out' }}
      >
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-cart3 me-2"></i>
            Your Cart ({getCartCount()})
          </h5>
          <button 
            className="btn btn-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close"
          />
        </div>

        <div className="flex-grow-1 overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
              <h5 className="fw-bold">Your cart is empty</h5>
              <p className="text-muted mb-4">Browse our products and add items to your cart</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false)
                  navigate('/pages/products')
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map(item => (
                <div key={item.id} className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
                  <div className="card-body p-3">
                    <div className="d-flex gap-3">
                      <div 
                        className="bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '70px', height: '70px', borderRadius: '0.5rem', overflow: 'hidden' }}
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
                      <div className="flex-grow-1">
                        <h6 className="mb-1" style={{ fontSize: '0.95rem' }}>{item.name}</h6>
                        <p className="text-primary fw-bold mb-2">{formatCurrency(item.price)}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <span className="px-2 fw-medium">{item.quantity}</span>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                          <button 
                            className="btn btn-sm text-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold fs-5">{formatCurrency(getCartTotal())}</span>
            </div>
            <button 
              className="btn btn-primary w-100 py-3 fw-bold"
              onClick={handleCheckout}
            >
              View Order Summary
            </button>
            <button 
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}

export default Cart
