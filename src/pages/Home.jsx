import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className="container py-4 py-md-5">
      <div className="row text-center justify-content-center mb-4 mb-md-5">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold mb-3">Jagolvi Dynamic Ventures</h1>
          <p className="lead text-muted fs-5 fs-md-4">
            Your Premium Marketplace for Genuine Truck Spare Parts & Expert Services
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-3 mt-3 mt-md-4">
            <Link to="/pages/about" className="btn btn-primary btn-lg shadow-sm">Explore Our Story</Link>
            <Link to="/pages/products" className="btn btn-outline-primary btn-lg">Browse Products</Link>
          </div>
        </div>
      </div>

      <div className="row align-items-center index-row-2 mx-0 mb-5">
        <div className="col-lg-5 mb-4 mb-lg-0 px-md-5 text-center text-lg-start">
          <h2 className="display-6 fw-bold mb-4">World-Class Solutions for Global Fleets</h2>
          <p className="fs-5 mb-4 opacity-75">
            We deliver high-performance truck components at competitive prices, direct from top-tier manufacturers. Reliable, durable, and genuine parts for the modern logistics era.
          </p>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill text-primary"></i>
            <span>Verified Industry Standards</span>
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <i className="bi bi-check-circle-fill text-primary"></i>
            <span>Nationwide Distribution</span>
          </div>
        </div>

        <div className="col-lg-7">
          <div id="carouselExampleAutoplaying" className="carousel slide shadow-lg rounded-4 overflow-hidden" data-bs-ride="carousel">
            <div className="carousel-inner bg-white" style={{ minHeight: '250px' }}>
              <div className="carousel-item active p-3 p-md-5">
                <img src="/images/images/Tata Logo.png" className="d-block w-100 mx-auto" alt="Tata Logo" style={{ maxHeight: '200px', objectFit: 'contain' }} />
              </div>
              <div className="carousel-item p-3 p-md-5">
                <img src="/images/images/Yutong Logo.png" className="d-block w-100 mx-auto" alt="Yutong Logo" style={{ maxHeight: '200px', objectFit: 'contain' }} />
              </div>
              <div className="carousel-item p-3 p-md-5">
                <img src="/images/images/Ashok_Leyland Logo.png" className="d-block w-100 mx-auto" alt="Ashok Leyland Logo" style={{ maxHeight: '200px', objectFit: 'contain' }} />
              </div>
              <div className="carousel-item p-3 p-md-5">
                <img src="/images/images/mercedes benz logo.png" className="d-block w-100 mx-auto" alt="Mercedes" style={{ maxHeight: '200px', objectFit: 'contain' }} />
              </div>
              <div className="carousel-item p-3 p-md-5">
                <img src="/images/images/Cummins Logo.png" className="d-block w-100 mx-auto" alt="Cummins" style={{ maxHeight: '200px', objectFit: 'contain' }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-dark rounded-circle p-2 p-md-3" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-dark rounded-circle p-2 p-md-3" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="row text-center mt-5">
        <div className="col-12">
          <div className="position-relative rounded-5 overflow-hidden shadow-lg">
            <img src="/images/images/Index background Image.jpg" className="w-100" alt="Background" style={{ maxHeight: '500px', objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
              <h3 className="display-4 fw-bold">Built for Reliability</h3>
              <p className="fs-4">Supporting Your Operations Round the Clock</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
