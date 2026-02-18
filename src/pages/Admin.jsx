import React, { useState, useRef, useEffect } from 'react'
import { useInventory } from '../context/InventoryContext'

const Admin = () => {
  const { inventory, addItem, updateItem, deleteItem, adjustQuantity, getMetrics, formatCurrency, categories } = useInventory()
  const metrics = getMetrics()
  const formRef = useRef(null)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: categories[0],
    quantity: '',
    price: '',
    images: ['', '', '']
  })
  const [imagePreviews, setImagePreviews] = useState(['', '', ''])

  const resetForm = () => {
    setFormData({ name: '', description: '', category: categories[0], quantity: '', price: '', images: ['', '', ''] })
    setImagePreviews(['', '', ''])
    setEditingId(null)
    setShowForm(false)
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...formData.images]
        newImages[index] = reader.result
        setFormData(prev => ({ ...prev, images: newImages }))

        const newPreviews = [...imagePreviews]
        newPreviews[index] = reader.result
        setImagePreviews(newPreviews)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const filteredImages = formData.images.filter(img => img !== '')
    const itemData = {
      ...formData,
      images: filteredImages,
      quantity: parseInt(formData.quantity) || 0,
      price: parseFloat(formData.price) || 0
    }

    if (editingId) {
      updateItem(editingId, itemData)
    } else {
      addItem(itemData)
    }
    resetForm()
  }

  const handleEdit = (item) => {
    const itemImages = item.images || []
    const paddedImages = [...itemImages, '', '', ''].slice(0, 3)
    setEditingId(item.id)
    setFormData({
      name: item.name,
      description: item.description || '',
      category: item.category,
      quantity: item.quantity.toString(),
      price: item.price.toString(),
      images: paddedImages
    })
    setImagePreviews([...paddedImages])
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id)
    }
  }

  const getImage = (item) => {
    return item.images && item.images.length > 0 ? item.images[0] : null
  }

  return (
    <main className="container py-5 min-vh-100">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="display-5 fw-bold mb-0">Inventory Dashboard</h1>
        <button 
          className="btn btn-primary btn-lg w-100 w-sm-auto" 
          onClick={() => { resetForm(); setShowForm(!showForm) }}
        >
          <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-lg'} me-2`}></i>
          {showForm ? 'Close Form' : 'Add Item'}
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="card shadow-lg mb-5 border-0" style={{ borderRadius: '1rem' }}>
          <div className="card-body p-4">
            <h4 className="mb-4 fw-bold">{editingId ? 'Edit Item' : 'Add New Item'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Part Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required 
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Category *</label>
                  <select 
                    className="form-select"
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Price (₦) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="0" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required 
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea 
                    className="form-control" 
                    rows="2"
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Quantity *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="0"
                    value={formData.quantity}
                    onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    required 
                  />
                </div>
                <div className="col-md-9">
                  <label className="form-label fw-semibold">Product Images (up to 3)</label>
                  <div className="row g-2">
                    {[0, 1, 2].map(idx => (
                      <div className="col-4" key={idx}>
                        <input 
                          type="file" 
                          className="form-control" 
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, idx)}
                        />
                        {imagePreviews[idx] && (
                          <div className="mt-2">
                            <img src={imagePreviews[idx]} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                          </div>
                        )}
                        {idx === 0 && <small className="text-muted d-block mt-1">Required</small>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg me-2">
                    <i className="bi bi-check-lg me-2"></i>
                    {editingId ? 'Update Item' : 'Add to Inventory'}
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-lg" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '1rem' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fw-semibold">Total Products</p>
                  <h2 className="display-6 fw-bold mb-0">{metrics.totalProducts}</h2>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                  <i className="bi bi-box-seam text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '1rem' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fw-semibold">Total Quantity</p>
                  <h2 className="display-6 fw-bold mb-0">{metrics.totalQuantity.toLocaleString()}</h2>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded-3">
                  <i className="bi bi-cubes text-success fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '1rem' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fw-semibold">Inventory Valuation</p>
                  <h2 className="display-6 fw-bold mb-0" style={{ fontSize: '1.5rem' }}>{formatCurrency(metrics.inventoryValuation)}</h2>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded-3">
                  <i className="bi bi-currency-naira text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '1rem' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fw-semibold">Low Stock Alerts</p>
                  <h2 className="display-6 fw-bold mb-0">{metrics.lowStockAlerts}</h2>
                </div>
                <div className={`bg-opacity-10 p-3 rounded-3 ${metrics.lowStockAlerts > 0 ? 'bg-danger' : 'bg-secondary'}`}>
                  <i className={`bi bi-exclamation-triangle fs-4 ${metrics.lowStockAlerts > 0 ? 'text-danger' : 'text-secondary'}`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <h4 className="fw-bold mb-3">Category Breakdown</h4>
        </div>
        {metrics.categoryBreakdown.map((cat, idx) => (
          <div className="col-md-4" key={cat.category}>
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '1rem' }}>
              <div className="card-body d-flex align-items-center">
                <div className={`bg-opacity-10 p-3 rounded-3 me-3 ${
                  idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-warning' : 'bg-success'
                }`}>
                  <i className={`bi ${
                    idx === 0 ? 'bi-tools' : idx === 1 ? 'bi-wrench' : 'bi-droplet'
                  } fs-4 ${
                    idx === 0 ? 'text-primary' : idx === 1 ? 'text-warning' : 'text-success'
                  }`}></i>
                </div>
                <div>
                  <p className="text-muted mb-0 small">{cat.category}</p>
                  <h5 className="fw-bold mb-0">{cat.count} items <span className="text-muted fw-normal">({cat.quantity} qty)</span></h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: '1rem' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Images</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No inventory items yet. Add your first item above.
                    </td>
                  </tr>
                ) : (
                  inventory.map(item => (
                    <tr key={item.id}>
                      <td className="ps-4">
                        {item.images && item.images.length > 0 ? (
                          <div className="d-flex gap-1">
                            {item.images.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt={`${item.name} ${idx + 1}`} style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                            ))}
                          </div>
                        ) : (
                          <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '0.5rem' }}>
                            <i className="bi bi-image text-muted"></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                        {item.description && <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>{item.description}</small>}
                      </td>
                      <td>
                        <span className={`badge ${
                          item.category === 'Service Parts' ? 'bg-primary' : 
                          item.category === 'Repair Parts' ? 'bg-warning text-dark' : 'bg-success'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={() => adjustQuantity(item.id, -1)}
                            disabled={item.quantity <= 0}
                          >-</button>
                          <span className={`mx-2 fw-bold ${
                            item.quantity === 0 ? 'text-danger' : 
                            item.quantity < 5 ? 'text-warning' : 'text-success'
                          }`}>
                            {item.quantity}
                          </span>
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={() => adjustQuantity(item.id, 1)}
                          >+</button>
                        </div>
                      </td>
                      <td className="fw-semibold">{formatCurrency(item.price)}</td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Admin
