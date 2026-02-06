'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/lib/protected-route'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Megaphone,
  Pin,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react'

interface Announcement {
  _id: string
  announcementId: string
  title: string
  message: string
  isImportant: boolean
  isPinned: boolean
  startDate: string
  expiryDate?: string
  isActive: boolean
  createdAt: string
  createdBy?: {
    name: string
    email: string
  }
}

export default function AnnouncementsPage() {
  const { token } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    isImportant: false,
    isPinned: false,
    startDate: new Date().toISOString().slice(0, 16),
    expiryDate: '',
  })

  useEffect(() => {
    if (token) {
      fetchAnnouncements()
    }
  }, [token])

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/announcements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data.success) {
        setAnnouncements(data.data.announcements)
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const endpoint = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/announcements/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/announcements`

    try {
      const response = await fetch(endpoint, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          expiryDate: formData.expiryDate || null,
        }),
      })

      const data = await response.json()
      if (data.success) {
        fetchAnnouncements()
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save announcement:', error)
    }
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement._id)
    setFormData({
      title: announcement.title,
      message: announcement.message,
      isImportant: announcement.isImportant,
      isPinned: announcement.isPinned,
      startDate: new Date(announcement.startDate).toISOString().slice(0, 16),
      expiryDate: announcement.expiryDate
        ? new Date(announcement.expiryDate).toISOString().slice(0, 16)
        : '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/announcements/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchAnnouncements()
      }
    } catch (error) {
      console.error('Failed to delete announcement:', error)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/announcements/${id}/toggle`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchAnnouncements()
      }
    } catch (error) {
      console.error('Failed to toggle status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      isImportant: false,
      isPinned: false,
      startDate: new Date().toISOString().slice(0, 16),
      expiryDate: '',
    })
    setEditingId(null)
    setShowForm(false)
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
    <ProtectedRoute>
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
                  <Megaphone className="text-primary-600" size={28} />
                  <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAnnouncements}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw size={20} />
                  Refresh
                </button>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  data-testid="add-announcement-button"
                >
                  <Plus size={20} />
                  New Announcement
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      maxLength={200}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Announcement title"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      maxLength={1000}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Announcement message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isImportant}
                        onChange={(e) =>
                          setFormData({ ...formData, isImportant: e.target.checked })
                        }
                        className="w-5 h-5 text-primary-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Mark as Important</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPinned}
                        onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                        className="w-5 h-5 text-primary-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Pin Announcement</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {editingId ? 'Update' : 'Create'} Announcement
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
          )}

          {/* List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                All Announcements ({announcements.length})
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="animate-spin mx-auto text-primary-600" size={40} />
                </div>
              ) : announcements.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No announcements yet. Create one to get started!
                </div>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement._id}
                      className={`border rounded-lg p-4 ${
                        announcement.isActive ? 'border-gray-200' : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900">{announcement.title}</h3>
                            {announcement.isPinned && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                <Pin size={12} />
                                Pinned
                              </span>
                            )}
                            {announcement.isImportant && (
                              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                <AlertCircle size={12} />
                                Important
                              </span>
                            )}
                            {!announcement.isActive && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{announcement.message}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span>ID: {announcement.announcementId}</span>
                            <span>Start: {formatDate(announcement.startDate)}</span>
                            {announcement.expiryDate && (
                              <span>Expires: {formatDate(announcement.expiryDate)}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleStatus(announcement._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              announcement.isActive
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title={announcement.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {announcement.isActive ? <Power size={18} /> : <PowerOff size={18} />}
                          </button>
                          <button
                            onClick={() => handleEdit(announcement)}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(announcement._id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
