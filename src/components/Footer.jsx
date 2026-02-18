import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 py-md-5 mt-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center mb-3">
                            <img src="/images/images/MINI JDV LOGO.png" alt="JDV Logo" height="38" className="me-2 filter-white" />
                            <span className="fw-bold fs-4">JDV</span>
                        </div>
                        <p className="opacity-75 small mb-3">
                            Nigeria's leading marketplace for premium truck spare parts and world-class maintenance services.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white opacity-75 hover-primary"><i className="bi bi-facebook fs-5"></i></a>
                            <a href="#" className="text-white opacity-75 hover-primary"><i className="bi bi-instagram fs-5"></i></a>
                            <a href="#" className="text-white opacity-75 hover-primary"><i className="bi bi-linkedin fs-5"></i></a>
                        </div>
                    </div>

                    <div className="col-6 col-lg-2 ms-lg-auto">
                        <h5 className="fw-bold mb-3 mb-lg-4">Quick Links</h5>
                        <ul className="list-unstyled opacity-75">
                            <li className="mb-2"><Link to="/" className="text-white">Home</Link></li>
                            <li className="mb-2"><Link to="/pages/about" className="text-white">About Us</Link></li>
                            <li className="mb-2"><Link to="/pages/products" className="text-white">Our Products</Link></li>
                            <li className="mb-2"><Link to="/pages/contact" className="text-white">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h5 className="fw-bold mb-3 mb-lg-4">Contact Us</h5>
                        <ul className="list-unstyled opacity-75">
                            <li className="mb-2 d-flex align-items-start">
                                <i className="bi bi-geo-alt me-2 text-primary mt-1"></i>
                                <span>Zuba Plaza, Abuja</span>
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="bi bi-telephone me-2 text-primary"></i>
                                <span>+234 902 992 6061</span>
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="bi bi-envelope me-2 text-primary"></i>
                                <span>info@jdv.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-4 my-md-5 opacity-25" />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start order-2 order-md-1">
                        <p className="mb-2 mb-md-0 opacity-50 small">&copy; {new Date().getFullYear()} Jagolvi Dynamic Ventures. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end order-1 order-md-2">
                        <div className="opacity-50 small">
                            <a href="#" className="text-white me-0 me-md-3">Privacy Policy</a>
                            <a href="#" className="text-white">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
