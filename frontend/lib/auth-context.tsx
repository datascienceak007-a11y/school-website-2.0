'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Admin {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  admin: Admin | null
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  isOwner: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem('adminToken')
      const storedAdmin = localStorage.getItem('adminData')

      if (storedToken && storedAdmin) {
        // Verify token with backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/admin/verify`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setToken(storedToken)
            setAdmin(JSON.parse(storedAdmin))
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminData')
          }
        } else {
          // Token invalid
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminData')
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await response.json()

      if (data.success && data.data) {
        // Store token and admin data
        localStorage.setItem('adminToken', data.data.token)
        localStorage.setItem('adminData', JSON.stringify(data.data.admin))
        
        setToken(data.data.token)
        setAdmin(data.data.admin)
        
        return { success: true }
      } else {
        return { success: false, message: data.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Failed to connect to server' }
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    setToken(null)
    setAdmin(null)
    router.push('/admin/login')
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!admin,
        isLoading,
        isOwner: admin?.role === 'super_admin',
        isAdmin: admin?.role === 'admin' || admin?.role === 'super_admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
