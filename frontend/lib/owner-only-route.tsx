'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'
import { RefreshCw, ShieldAlert } from 'lucide-react'

interface OwnerOnlyRouteProps {
  children: React.ReactNode
}

export default function OwnerOnlyRoute({ children }: OwnerOnlyRouteProps) {
  const { isAuthenticated, isLoading, isOwner } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login')
    } else if (!isLoading && isAuthenticated && !isOwner) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, isLoading, isOwner, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="animate-spin text-primary-600 mx-auto mb-4" size={40} />
          <p className="text-gray-600">Verifying permissions...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShieldAlert className="text-red-600 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Owner privileges required.</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
