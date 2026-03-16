import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const InventoryContext = createContext()

const CATEGORIES = ['Service Parts', 'Repair Parts', 'Consumables']

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
}

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('date_added', { ascending: false })

      if (error) throw error
      setInventory(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const addItem = async (item) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: item.name,
          description: item.description || null,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          images: item.images || []
        }])
        .select()

      if (error) throw error
      const newItem = data[0]
      setInventory(prev => [newItem, ...prev])
      return newItem
    } catch (err) {
      console.error('Error adding item:', err)
      throw err
    }
  }

  const updateItem = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          description: updates.description || null,
          category: updates.category,
          quantity: updates.quantity,
          price: updates.price,
          images: updates.images || []
        })
        .eq('id', id)
        .select()

      if (error) throw error
      setInventory(prev => prev.map(item => item.id === id ? data[0] : item))
      return data[0]
    } catch (err) {
      console.error('Error updating item:', err)
      throw err
    }
  }

  const deleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      setInventory(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error('Error deleting item:', err)
      throw err
    }
  }

  const adjustQuantity = async (id, delta) => {
    const item = inventory.find(i => i.id === id)
    if (!item) return

    const newQty = Math.max(0, item.quantity + delta)
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ quantity: newQty })
        .eq('id', id)

      if (error) throw error
      setInventory(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i))
    } catch (err) {
      console.error('Error adjusting quantity:', err)
      throw err
    }
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
      loading,
      error,
      addItem, 
      updateItem, 
      deleteItem, 
      adjustQuantity,
      getMetrics,
      formatCurrency,
      categories: CATEGORIES,
      refetch: fetchProducts
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