import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileChecked, setProfileChecked] = useState(false)
  const [error, setError] = useState(null)

  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null)
      setProfileChecked(true)
      return null
    }
    setProfileLoading(true)
    setProfileChecked(false)
    try {
      console.log('Fetching profile for userId:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      console.log('Profile fetch result:', { data, error })
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        setProfile(null)
      } else {
        setProfile(data)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setProfile(null)
    } finally {
      setProfileLoading(false)
      setProfileChecked(true)
    }
    return null
  }

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user || null)
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setProfileChecked(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setProfileChecked(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, firstName = '', lastName = '', phone = '', role = 'user') => {
    setError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${import.meta.env.VITE_APP_BASE_URL}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            role: role
          }
        }
      })
      if (error) throw error
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const signIn = async (email, password) => {
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      if (data?.user) {
        await fetchProfile(data.user.id)
      }
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setProfile(null)
      setProfileChecked(true)
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  const resetPassword = async (email) => {
    setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/auth/reset-password`
      })
      if (error) throw error
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updatePassword = async (newPassword) => {
    setError(null)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      profileLoading,
      profileChecked,
      error,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
