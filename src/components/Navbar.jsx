import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top glass shadow-sm py-2">
                <div className="container">
                    <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeMenu}>
                        <img src="/images/images/MINI JDV LOGO.png" alt="JDV Logo" height="38" className="me-2" />
                        <span className="fw-bold fs-4 d-none d-sm-inline">JDV</span>
                    </Link>

                    <div className="d-flex align-items-center gap-2">
                        <button
                            className="navbar-toggler border-0 p-2"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-controls="navbarSupportedContent"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                            style={{ width: '44px', height: '44px' }}
                        >
                            <div className="hamburger" style={{ width: '24px', height: '18px', position: 'relative' }}>
                                <span style={{
                                    display: 'block',
                                    position: 'absolute',
                                    height: '2px',
                                    width: '100%',
                                    background: '#0f172a',
                                    borderRadius: '2px',
                                    opacity: 1,
                                    left: 0,
                                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                    top: isOpen ? '8px' : '0px',
                                    transition: 'all 0.3s ease-in-out'
                                }}></span>
                                <span style={{
                                    display: 'block',
                                    position: 'absolute',
                                    height: '2px',
                                    width: '100%',
                                    background: '#0f172a',
                                    borderRadius: '2px',
                                    opacity: isOpen ? 0 : 1,
                                    left: 0,
                                    top: '8px',
                                    transition: 'all 0.3s ease-in-out'
                                }}></span>
                                <span style={{
                                    display: 'block',
                                    position: 'absolute',
                                    height: '2px',
                                    width: '100%',
                                    background: '#0f172a',
                                    borderRadius: '2px',
                                    opacity: 1,
                                    left: 0,
                                    transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                                    top: isOpen ? '8px' : '16px',
                                    transition: 'all 0.3s ease-in-out'
                                }}></span>
                            </div>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="d-none d-lg-flex align-items-center">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/pages/about" className={`nav-link ${isActive('/pages/about')}`}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pages/contact" className={`nav-link ${isActive('/pages/contact')}`}>Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pages/products" className={`nav-link ${isActive('/pages/products')}`}>Products</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <div 
                className={`position-fixed top-0 start-0 w-100 h-100 bg-dark ${isOpen ? 'd-block' : 'd-none'}`}
                style={{ zIndex: 999, opacity: 0.5 }}
                onClick={closeMenu}
            ></div>

            {/* Mobile Menu */}
            <div 
                className={`position-fixed top-0 end-0 h-100 bg-white shadow-lg d-lg-none ${isOpen ? 'slide-in' : 'slide-out'}`}
                style={{ 
                    zIndex: 1000, 
                    width: '280px',
                    paddingTop: '80px',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isOpen ? 'translateX(0%)' : 'translateX(100%)'
                }}
            >
                <ul className="navbar-nav px-4">
                    <li className="nav-item mb-2">
                        <Link 
                            to="/" 
                            className={`nav-link py-3 px-3 rounded-3 ${isActive('/')}`} 
                            onClick={closeMenu}
                            style={{ fontSize: '1.1rem' }}
                        >
                            <i className="bi bi-house-door me-2"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link 
                            to="/pages/about" 
                            className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/about')}`} 
                            onClick={closeMenu}
                            style={{ fontSize: '1.1rem' }}
                        >
                            <i className="bi bi-info-circle me-2"></i> About
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link 
                            to="/pages/products" 
                            className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/products')}`} 
                            onClick={closeMenu}
                            style={{ fontSize: '1.1rem' }}
                        >
                            <i className="bi bi-box-seam me-2"></i> Products
                        </Link>
                    </li>
                    <li className="nav-item mb-4">
                        <Link 
                            to="/pages/contact" 
                            className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/contact')}`} 
                            onClick={closeMenu}
                            style={{ fontSize: '1.1rem' }}
                        >
                            <i className="bi bi-envelope me-2"></i> Contact
                        </Link>
                    </li>
                </ul>
                
                <div className="px-4 mt-4">
                    <div className="input-group">
                        <input 
                            className="form-control" 
                            type="search" 
                            placeholder="Search..." 
                            aria-label="Search"
                        />
                        <button className="btn btn-primary">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="position-absolute bottom-0 start-0 w-100 p-4 border-top">
                    <p className="text-muted small text-center mb-0">
                        &copy; 2024 JDV. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Navbar
