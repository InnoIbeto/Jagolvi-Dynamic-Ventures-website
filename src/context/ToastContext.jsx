import React, { createContext, useContext, useState, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    return {
      success: (msg) => toast.success(msg),
      error: (msg) => toast.error(msg),
      warning: (msg) => toast.warning(msg),
      info: (msg) => toast.info(msg)
    }
  }
  return context
}

export const success = (msg) => toast.success(msg)
export const error = (msg) => toast.error(msg)
export const warning = (msg) => toast.warning(msg)
export const info = (msg) => toast.info(msg)