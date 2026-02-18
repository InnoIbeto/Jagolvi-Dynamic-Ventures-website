import React, { useState } from 'react'
import { useInventory } from '../context/InventoryContext'

const Products = () => {
  const { inventory, formatCurrency, categories } = useInventory()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeImageIndex, setActiveImageIndex] = useState({})

  const filteredInventory = inventory.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getStockStatus = (qty) => {
    if (qty === 0) return { label: 'Out of Stock', class: 'bg-danger' }
    if (qty < 5) return { label: 'Low Stock', class: 'bg-warning text-dark' }
    return { label: 'In Stock', class: 'bg-success' }
  }

  const handleImageClick = (itemId, direction) => {
    const item = inventory.find(i => i.id === itemId)
    if (!item || !item.images || item.images.length <= 1) return

    const currentIndex = activeImageIndex[itemId] || 0
    let newIndex = currentIndex + direction
    if (newIndex < 0) newIndex = item.images.length - 1
    if (newIndex >= item.images.length) newIndex = 0

    setActiveImageIndex(prev => ({ ...prev, [itemId]: newIndex }))
  }

  const getCurrentImage = (item) => {
    if (!item.images || item.images.length === 0) return null
    const idx = activeImageIndex[item.id] || 0
    return item.images[idx]
  }

  return (
    <main className="container py-5 min-vh-100">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Our <span className="text-primary">Products</span></h1>
        <p className="lead text-muted">Browse our genuine truck spare parts inventory</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <ul className="nav nav-pills justify-content-center justify-content-md-start gap-2">
            <li className="nav-item">
              <button 
                className={`btn ${activeCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveCategory('All')}
              >
                All Products
              </button>
            </li>
            {categories.map(cat => (
              <li className="nav-item" key={cat}>
                <button 
                  className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {inventory.length === 0 ? (
        <div className="text-center py-5">
          <div className="card border-0 shadow-sm py-5" style={{ borderRadius: '1rem' }}>
            <div className="card-body">
              <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
              <h4 className="fw-bold">No Products Available</h4>
              <p className="text-muted mb-4">Our inventory is being updated. Please check back soon.</p>
              <a href="/pages/contact" className="btn btn-primary">Contact Us for Availability</a>
            </div>
          </div>
        </div>
      ) : filteredInventory.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
          <h4 className="fw-bold">No Products Found</h4>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
          <button className="btn btn-outline-primary" onClick={() => { setActiveCategory('All'); setSearchTerm('') }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredInventory.map(item => {
            const stockStatus = getStockStatus(item.quantity)
            const currentImage = getCurrentImage(item)
            const hasMultipleImages = item.images && item.images.length > 1

            return (
              <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                <div className="card h-100 border-0 shadow-sm product-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                  <div className="position-relative">
                    {currentImage ? (
                      <img 
                        src={currentImage} 
                        alt={item.name} 
                        className="card-img-top" 
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div 
                        className="card-img-top d-flex align-items-center justify-content-center bg-light" 
                        style={{ height: '180px' }}
                      >
                        <i className="bi bi-image text-muted fs-1"></i>
                      </div>
                    )}
                    
                    {hasMultipleImages && (
                      <>
                        <button 
                          className="btn btn-sm btn-light position-absolute top-50 start-0 ms-2 rounded-circle"
                          style={{ width: '32px', height: '32px', opacity: 0.8 }}
                          onClick={() => handleImageClick(item.id, -1)}
                        >
                          <i className="bi bi-chevron-left"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-light position-absolute top-50 end-0 me-2 rounded-circle"
                          style={{ width: '32px', height: '32px', opacity: 0.8 }}
                          onClick={() => handleImageClick(item.id, 1)}
                        >
                          <i className="bi bi-chevron-right"></i>
                        </button>
                        
                        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1">
                          {item.images.map((_, idx) => (
                            <span 
                              key={idx} 
                              className={`d-block rounded-circle ${idx === (activeImageIndex[item.id] || 0) ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                              style={{ width: '8px', height: '8px' }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    
                    <span className={`position-absolute top-0 end-0 badge ${stockStatus.class} m-2`}>
                      {stockStatus.label}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <span className={`badge mb-2 ${
                      item.category === 'Service Parts' ? 'bg-primary' : 
                      item.category === 'Repair Parts' ? 'bg-warning text-dark' : 'bg-success'
                    }`} style={{ width: 'fit-content' }}>
                      {item.category}
                    </span>
                    <h5 className="card-title fw-bold mb-1" style={{ fontSize: '1rem' }}>{item.name}</h5>
                    {item.description && (
                      <p className="card-text text-muted small mb-2" style={{ 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </p>
                    )}
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5 text-primary">{formatCurrency(item.price)}</span>
                      <small className="text-muted">{item.quantity} available</small>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {filteredInventory.length > 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">Showing {filteredInventory.length} of {inventory.length} products</p>
        </div>
      )}
    </main>
  )
}

export default Products
