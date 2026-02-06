'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/lib/protected-route'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  RefreshCw,
  ArrowLeft,
  Power,
  PowerOff,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'

interface Slide {
  _id: string
  sliderId: string
  title: string
  description?: string
  imageUrl: string
  buttonText?: string
  buttonLink?: string
  order: number
  isActive: boolean
  createdAt: string
}

export default function AdminSliderPage() {
  const { token } = useAuth()
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
  })

  useEffect(() => {
    if (token) {
      fetchSlides()
    }
  }, [token])

  const fetchSlides = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data.success) {
        setSlides(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch slides:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider`

    try {
      const response = await fetch(endpoint, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          buttonText: formData.buttonText || undefined,
          buttonLink: formData.buttonLink || undefined,
        }),
      })

      const data = await response.json()
      if (data.success) {
        fetchSlides()
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save slide:', error)
    }
  }

  const handleEdit = (slide: Slide) => {
    setEditingId(slide._id)
    setFormData({
      title: slide.title,
      description: slide.description || '',
      imageUrl: slide.imageUrl,
      buttonText: slide.buttonText || '',
      buttonLink: slide.buttonLink || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchSlides()
      }
    } catch (error) {
      console.error('Failed to delete slide:', error)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider/${id}/toggle`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchSlides()
      }
    } catch (error) {
      console.error('Failed to toggle status:', error)
    }
  }

  const handleMoveUp = async (slide: Slide) => {
    if (slide.order === 1) return

    const slideAbove = slides.find((s) => s.order === slide.order - 1)
    if (!slideAbove) return

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider/reorder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slides: [
              { id: slide._id, order: slide.order - 1 },
              { id: slideAbove._id, order: slideAbove.order + 1 },
            ],
          }),
        }
      )
      fetchSlides()
    } catch (error) {
      console.error('Failed to reorder slides:', error)
    }
  }

  const handleMoveDown = async (slide: Slide) => {
    if (slide.order === slides.length) return

    const slideBelow = slides.find((s) => s.order === slide.order + 1)
    if (!slideBelow) return

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/slider/reorder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slides: [
              { id: slide._id, order: slide.order + 1 },
              { id: slideBelow._id, order: slideBelow.order - 1 },
            ],
          }),
        }
      )
      fetchSlides()
    } catch (error) {
      console.error('Failed to reorder slides:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
    })
    setEditingId(null)
    setShowForm(false)
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
                  <ImageIcon className="text-primary-600" size={28} />
                  <h1 className="text-2xl font-bold text-gray-900">Hero Slider Management</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchSlides}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw size={20} />
                  Refresh
                </button>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus size={20} />
                  Add Slide
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
                {editingId ? 'Edit Slide' : 'Add New Slide'}
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
                      placeholder="e.g., Shape Your Child's Bright Future"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Short description or tagline"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use high-quality images (recommended: 1920x1080px or higher)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      maxLength={50}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Apply Now"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Link (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="/admissions or https://..."
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {editingId ? 'Update' : 'Create'} Slide
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
                All Slides ({slides.length})
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="animate-spin mx-auto text-primary-600" size={40} />
                </div>
              ) : slides.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No slides yet. Add one to get started!
                </div>
              ) : (
                <div className="space-y-4">
                  {slides.map((slide) => (
                    <div
                      key={slide._id}
                      className={`border rounded-lg overflow-hidden ${
                        slide.isActive ? 'border-gray-200' : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-4 p-4">
                        {/* Thumbnail */}
                        <div className="w-full md:w-48 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">{slide.title}</h3>
                            {!slide.isActive && (
                              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0">
                                Inactive
                              </span>
                            )}
                          </div>
                          {slide.description && (
                            <p className="text-gray-600 text-sm mb-3">{slide.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span>Order: #{slide.order}</span>
                            <span>ID: {slide.sliderId}</span>
                            {slide.buttonText && <span>Button: {slide.buttonText}</span>}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-2">
                          <button
                            onClick={() => handleMoveUp(slide)}
                            disabled={slide.order === 1}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                            title="Move up"
                          >
                            <ChevronUp size={18} />
                          </button>
                          <button
                            onClick={() => handleMoveDown(slide)}
                            disabled={slide.order === slides.length}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                            title="Move down"
                          >
                            <ChevronDown size={18} />
                          </button>
                          <a
                            href={slide.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            title="View image"
                          >
                            <ExternalLink size={18} />
                          </a>
                          <button
                            onClick={() => handleToggleStatus(slide._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              slide.isActive
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title={slide.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {slide.isActive ? <Power size={18} /> : <PowerOff size={18} />}
                          </button>
                          <button
                            onClick={() => handleEdit(slide)}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(slide._id)}
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
