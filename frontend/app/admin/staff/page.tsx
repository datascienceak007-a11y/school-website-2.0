'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import OwnerOnlyRoute from '@/lib/owner-only-route'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  Users,
  RefreshCw,
  ArrowLeft,
  Shield,
  ShieldCheck,
  Power,
  PowerOff,
  Key,
  X,
} from 'lucide-react'

interface StaffMember {
  _id: string
  email: string
  name: string
  role: 'super_admin' | 'admin'
  isActive: boolean
  lastLogin?: string
  createdAt: string
}

export default function StaffManagementPage() {
  const { token, admin } = useAuth()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [resetPasswordId, setResetPasswordId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'admin' as 'super_admin' | 'admin',
  })
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    if (token) {
      fetchStaff()
    }
  }, [token])

  const fetchStaff = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/staff`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data.success) {
        setStaff(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/staff/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/staff`

    try {
      const response = await fetch(endpoint, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingId ? { name: formData.name, role: formData.role } : formData),
      })

      const data = await response.json()
      if (data.success) {
        fetchStaff()
        resetForm()
      } else {
        alert(data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Failed to save staff:', error)
      alert('Failed to save staff member')
    }
  }

  const handleEdit = (member: StaffMember) => {
    setEditingId(member._id)
    setFormData({
      email: member.email,
      password: '',
      name: member.name,
      role: member.role,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/staff/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchStaff()
      } else {
        alert(data.message || 'Delete failed')
      }
    } catch (error) {
      console.error('Failed to delete staff:', error)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/staff/${resetPasswordId}/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        }
      )

      const data = await response.json()
      if (data.success) {
        alert('Password reset successfully')
        setShowPasswordReset(false)
        setResetPasswordId(null)
        setNewPassword('')
      } else {
        alert(data.message || 'Password reset failed')
      }
    } catch (error) {
      console.error('Failed to reset password:', error)
      alert('Failed to reset password')
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'admin',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const getRoleBadge = (role: string) => {
    if (role === 'super_admin') {
      return (
        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
          <ShieldCheck size={14} />
          Owner
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
        <Shield size={14} />
        Staff
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <OwnerOnlyRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/dashboard"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div className="flex items-center gap-3">
                  <Users className="text-primary-600" size={28} />
                  <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchStaff}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw size={20} />
                  Refresh
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus size={20} />
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Add/Edit Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId ? 'Edit Staff Member' : 'Add New Staff Member'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {!editingId && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password *
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          minLength={8}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as 'super_admin' | 'admin' })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="admin">Staff (Content Management)</option>
                      <option value="super_admin">Owner (Full Access)</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {editingId ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Password Reset Modal */}
          {showPasswordReset && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
                  <button
                    onClick={() => {
                      setShowPasswordReset(false)
                      setResetPasswordId(null)
                      setNewPassword('')
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Minimum 8 characters"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Reset Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordReset(false)
                        setResetPasswordId(null)
                        setNewPassword('')
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Staff List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">All Staff Members ({staff.length})</h2>
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="animate-spin mx-auto text-primary-600" size={40} />
                </div>
              ) : staff.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No staff members yet.</div>
              ) : (
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div
                      key={member._id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                            {getRoleBadge(member.role)}
                            {!member.isActive && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">
                                Inactive
                              </span>
                            )}
                            {member._id === admin?.id && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{member.email}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span>Created: {formatDate(member.createdAt)}</span>
                            {member.lastLogin && <span>Last login: {formatDate(member.lastLogin)}</span>}
                          </div>
                        </div>

                        {member._id !== admin?.id && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setResetPasswordId(member._id)
                                setShowPasswordReset(true)
                              }}
                              className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                              title="Reset Password"
                            >
                              <Key size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(member)}
                              className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(member._id)}
                              className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </OwnerOnlyRoute>
  )
}
