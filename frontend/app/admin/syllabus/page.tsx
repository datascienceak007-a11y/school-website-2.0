'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/lib/protected-route'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  RefreshCw,
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react'

interface Syllabus {
  _id: string
  syllabusId: string
  title: string
  class: string
  subject: string
  academicYear: string
  description?: string
  fileUrl: string
  fileSize?: string
  isActive: boolean
  createdAt: string
  uploadedBy?: {
    name: string
    email: string
  }
}

const CLASSES = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
]

const SUBJECTS = [
  'English',
  'Mathematics',
  'Science',
  'Social Studies',
  'Hindi',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Economics',
  'Business Studies',
  'Accountancy',
  'Political Science',
  'Physical Education',
  'Art',
  'Music',
]

export default function AdminSyllabusPage() {
  const { token } = useAuth()
  const [syllabusList, setSyllabusList] = useState<Syllabus[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    subject: '',
    academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    description: '',
    fileUrl: '',
    fileSize: '',
  })

  useEffect(() => {
    if (token) {
      fetchSyllabus()
    }
  }, [token])

  const fetchSyllabus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/syllabus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data.success) {
        setSyllabusList(data.data.syllabus)
      }
    } catch (error) {
      console.error('Failed to fetch syllabus:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/syllabus/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/syllabus`

    try {
      const response = await fetch(endpoint, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        fetchSyllabus()
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save syllabus:', error)
    }
  }

  const handleEdit = (syllabus: Syllabus) => {
    setEditingId(syllabus._id)
    setFormData({
      title: syllabus.title,
      class: syllabus.class,
      subject: syllabus.subject,
      academicYear: syllabus.academicYear,
      description: syllabus.description || '',
      fileUrl: syllabus.fileUrl,
      fileSize: syllabus.fileSize || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this syllabus?')) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/syllabus/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchSyllabus()
      }
    } catch (error) {
      console.error('Failed to delete syllabus:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      class: '',
      subject: '',
      academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
      description: '',
      fileUrl: '',
      fileSize: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const groupedByClass = syllabusList.reduce((acc, syllabus) => {
    if (!acc[syllabus.class]) {
      acc[syllabus.class] = []
    }
    acc[syllabus.class].push(syllabus)
    return acc
  }, {} as Record<string, Syllabus[]>)

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
                  <BookOpen className="text-primary-600" size={28} />
                  <h1 className="text-2xl font-bold text-gray-900">Syllabus Management</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchSyllabus}
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
                  Add Syllabus
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
                {editingId ? 'Edit Syllabus' : 'Add New Syllabus'}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Mathematics - Complete Syllabus"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class *
                    </label>
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Class</option>
                      {CLASSES.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Subject</option>
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Academic Year *
                    </label>
                    <input
                      type="text"
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      required
                      placeholder="2025-2026"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      File Size (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.fileSize}
                      onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                      placeholder="e.g., 2.5 MB"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      File URL *
                    </label>
                    <input
                      type="url"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                      required
                      placeholder="https://example.com/syllabus.pdf"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload your PDF to Google Drive, Dropbox, or any file hosting service and paste the public link here
                    </p>
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
                      placeholder="Brief description of the syllabus content..."
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {editingId ? 'Update' : 'Add'} Syllabus
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
                All Syllabus ({syllabusList.length})
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="animate-spin mx-auto text-primary-600" size={40} />
                </div>
              ) : syllabusList.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No syllabus uploaded yet. Add one to get started!
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedByClass)
                    .sort(([a], [b]) => {
                      const aNum = parseInt(a.replace('Class ', ''))
                      const bNum = parseInt(b.replace('Class ', ''))
                      return aNum - bNum
                    })
                    .map(([className, syllabuses]) => (
                      <div key={className}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                            {className.replace('Class ', '')}
                          </div>
                          {className}
                        </h3>
                        <div className="space-y-3">
                          {syllabuses.map((syllabus) => (
                            <div
                              key={syllabus._id}
                              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="text-primary-600" size={20} />
                                    <h4 className="font-bold text-gray-900">{syllabus.title}</h4>
                                    <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs font-semibold">
                                      {syllabus.subject}
                                    </span>
                                  </div>
                                  {syllabus.description && (
                                    <p className="text-sm text-gray-600 mb-2">
                                      {syllabus.description}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                    <span>ID: {syllabus.syllabusId}</span>
                                    <span>Academic Year: {syllabus.academicYear}</span>
                                    {syllabus.fileSize && <span>Size: {syllabus.fileSize}</span>}
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <a
                                    href={syllabus.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                    title="View File"
                                  >
                                    <ExternalLink size={18} />
                                  </a>
                                  <button
                                    onClick={() => handleEdit(syllabus)}
                                    className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(syllabus._id)}
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
