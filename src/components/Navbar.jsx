import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar navbar-expand-lg sticky-top glass shadow-sm py-3">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img src="/images/images/MINI JDV LOGO.png" alt="JDV Logo" height="40" className="me-2" />
                    <span className="fw-bold fs-4 d-none d-sm-inline">JDV</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/pages/about" className={`nav-link ${isActive('/pages/about')}`}>About</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/pages/contact" className={`nav-link ${isActive('/pages/contact')}`}>Contact</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Products
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="/pages/products" className="dropdown-item">Servicing Parts</Link></li>
                                <li><Link to="/pages/products" className="dropdown-item">Spare Parts</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to="/pages/products" className="dropdown-item">Vehicle Repair</Link></li>
                            </ul>
                        </li>
                    </ul>

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
