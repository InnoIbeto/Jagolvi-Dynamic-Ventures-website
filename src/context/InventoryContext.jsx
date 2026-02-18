import React, { createContext, useContext, useState, useEffect } from 'react'

const InventoryContext = createContext()

const STORAGE_KEY = 'jdv_inventory'

const CATEGORIES = ['Service Parts', 'Repair Parts', 'Consumables']

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
}

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory))
  }, [inventory])

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    }
    setInventory(prev => [...prev, newItem])
    return newItem
  }

  const updateItem = (id, updates) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const deleteItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id))
  }

  const adjustQuantity = (id, delta) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const getMetrics = () => {
    const totalProducts = inventory.length
    const totalQuantity = inventory.reduce((sum, item) => sum + (item.quantity || 0), 0)
    const inventoryValuation = inventory.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0)
    const lowStockAlerts = inventory.filter(item => item.quantity > 0 && item.quantity < 5).length
    
    const categoryBreakdown = CATEGORIES.map(cat => ({
      category: cat,
      count: inventory.filter(item => item.category === cat).length,
      quantity: inventory.filter(item => item.category === cat).reduce((sum, item) => sum + (item.quantity || 0), 0)
    }))

    return {
      totalProducts,
      totalQuantity,
      inventoryValuation,
      lowStockAlerts,
      categoryBreakdown
    }
  }

  return (
    <InventoryContext.Provider value={{ 
      inventory, 
      addItem, 
      updateItem, 
      deleteItem, 
      adjustQuantity,
      getMetrics,
      formatCurrency,
      categories: CATEGORIES
    }}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider')
  }
  return context
}
