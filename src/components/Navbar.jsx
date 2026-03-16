import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, profile, signOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const isActive = (path) => location.pathname === path ? 'active' : ''

    const closeMenu = () => setIsOpen(false)

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
        closeMenu()
        setDropdownOpen(false)
    }

    const getInitials = () => {
        const first = profile?.first_name || ''
        const last = profile?.last_name || ''
        if (first && last) return `${first[0]}${last[0]}`.toUpperCase()
        if (first) return first[0].toUpperCase()
        return user?.email?.[0]?.toUpperCase() || '?'
    }

    const getDisplayName = () => {
        if (profile?.first_name) return profile.first_name
        return user?.email?.split('@')[0] || 'User'
    }

    const getRoleLabel = () => {
        return profile?.role === 'admin' ? 'Admin' : 'Customer'
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
                            {profile?.role === 'admin' && (
                                <li className="nav-item">
                                    <Link to="/pages/admin" className={`nav-link ${isActive('/pages/admin')}`}>Admin</Link>
                                </li>
                            )}
                        </ul>
                        
                        {user ? (
                            <div className="dropdown" ref={dropdownRef}>
                                <button 
                                    className="btn btn-outline-primary d-flex align-items-center gap-2 dropdown-toggle"
                                    type="button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                        {getInitials()}
                                    </div>
                                    <span className="d-none d-md-inline">{getDisplayName()}</span>
                                </button>
                                <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`} style={{ marginTop: '8px' }}>
                                    <li>
                                        <div className="dropdown-item-text">
                                            <div className="fw-semibold">{profile?.first_name} {profile?.last_name}</div>
                                            <small className="text-muted">{profile?.role === 'admin' ? 'Administrator' : 'Customer'}</small>
                                        </div>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    {profile?.role === 'admin' && (
                                        <li>
                                            <Link to="/pages/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                                <i className="bi bi-gear me-2"></i> Admin Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleSignOut}>
                                            <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/pages/login" className="btn btn-outline-primary btn-sm">Sign In</Link>
                                <Link to="/pages/signup" className="btn btn-primary btn-sm">Sign Up</Link>
                            </div>
                        )}
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
                        <Link to="/" className={`nav-link py-3 px-3 rounded-3 ${isActive('/')}`} onClick={closeMenu} style={{ fontSize: '1.1rem' }}>
                            <i className="bi bi-house-door me-2"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/pages/about" className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/about')}`} onClick={closeMenu} style={{ fontSize: '1.1rem' }}>
                            <i className="bi bi-info-circle me-2"></i> About
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/pages/products" className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/products')}`} onClick={closeMenu} style={{ fontSize: '1.1rem' }}>
                            <i className="bi bi-box-seam me-2"></i> Products
                        </Link>
                    </li>
                    <li className="nav-item mb-4">
                        <Link to="/pages/contact" className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/contact')}`} onClick={closeMenu} style={{ fontSize: '1.1rem' }}>
                            <i className="bi bi-envelope me-2"></i> Contact
                        </Link>
                    </li>
                    
                    {profile?.role === 'admin' && (
                        <li className="nav-item mb-4">
                            <Link to="/pages/admin" className={`nav-link py-3 px-3 rounded-3 ${isActive('/pages/admin')}`} onClick={closeMenu} style={{ fontSize: '1.1rem' }}>
                                <i className="bi bi-gear me-2"></i> Admin
                            </Link>
                        </li>
                    )}
                </ul>
                
                <div className="px-4 mt-4">
                    {user ? (
                        <div className="card border-0 bg-light">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '16px' }}>
                                        {getInitials()}
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{getDisplayName()}</div>
                                        <small className="text-muted">{getRoleLabel()}</small>
                                    </div>
                                </div>
                                <button className="btn btn-outline-danger w-100" onClick={handleSignOut}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link to="/pages/login" className="btn btn-outline-primary flex-grow-1">Sign In</Link>
                            <Link to="/pages/signup" className="btn btn-primary flex-grow-1">Sign Up</Link>
                        </div>
                    )}
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