import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <main className="container py-5 min-vh-100 d-flex align-items-center">
      <div className="row align-items-center gy-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-3 fw-bold mb-4">Inventory <span className="text-primary">Incoming</span></h1>
          <p className="lead fs-4 text-muted mb-5">
            We are currently digitizing our extensive catalog of genuine truck spare parts. Soon, you'll be able to browse and order directly from our world-class inventory.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <Link to="/pages/contact" className="btn btn-primary btn-lg shadow-sm">Notify Me When Ready</Link>
            <Link to="/" className="btn btn-outline-dark btn-lg">Back to Home</Link>
          </div>
        </div>

        <div className="col-lg-6 text-center">
          <div className="position-relative">
            <div className="position-absolute top-50 start-50 translate-middle bg-primary opacity-10 rounded-circle" style={{ width: '120%', height: '120%', filter: 'blur(60px)' }}></div>
            <img src="/images/images/Under Construction Image.png" alt="Under Construction" className="img-fluid position-relative z-1 hover-lift" style={{ maxHeight: '450px' }} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Products
