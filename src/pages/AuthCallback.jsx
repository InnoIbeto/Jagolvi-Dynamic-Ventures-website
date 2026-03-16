import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthCallback = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession()
        if (error) {
          setError(error.message)
        } else {
          navigate('/pages/products')
        }
      } catch (err) {
        setError(err.message)
      }
    }

    handleAuthCallback()
  }, [navigate])

  if (error) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="alert alert-danger">
          <h4>Authentication Error</h4>
          <p>{error}</p>
          <a href="/pages/login" className="btn btn-primary">Back to Login</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Verifying your account...</p>
      </div>
    </main>
  )
}

export default AuthCallback
