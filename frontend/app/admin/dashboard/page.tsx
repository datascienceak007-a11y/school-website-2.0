'use client'

import { useState, useEffect } from 'react'
import {
  LogOut,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Filter,
  RefreshCw,
  Shield,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/lib/protected-route'

interface Enquiry {
  _id: string
  enquiryId: string
  studentName: string
  parentName: string
  email: string
  phone: string
  branch: string
  grade: string
  message?: string
  status: 'pending' | 'contacted' | 'enrolled' | 'rejected'
  createdAt: string
}

interface Stats {
  total: number
  pending: number
  contacted: number
  enrolled: number
  rejected: number
}

export default function AdminDashboardPage() {
  const { admin, token, logout } = useAuth()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterBranch, setFilterBranch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token, filterBranch, filterStatus])

  const fetchData = async () => {
    if (!token) return
    
    setLoading(true)
    try {
      const [enquiriesRes, statsRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/enquiries?branch=${filterBranch}&status=${filterStatus}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/enquiries/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ])

      const enquiriesData = await enquiriesRes.json()
      const statsData = await statsRes.json()

      if (enquiriesData.success) {
        setEnquiries(enquiriesData.data.enquiries)
      }

      if (statsData.success) {
        setStats(statsData.data.overall)
      }
    } catch (error) {
      console.error('Fetch data error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (enquiryId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/enquiries/${enquiryId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      )

      const data = await response.json()

      if (data.success) {
        fetchData(token)
      }
    } catch (error) {
      console.error('Update status error:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      enrolled: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || styles.pending
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

  if (loading && !adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin text-primary-600" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {adminData?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              data-testid="logout-button"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="text-primary-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Enquiries</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <Phone className="text-blue-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.contacted}</p>
              <p className="text-sm text-gray-600">Contacted</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.enrolled}</p>
              <p className="text-sm text-gray-600">Enrolled</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="text-red-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </div>
        )}

        {/* Filters and Refresh */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-900">Filters:</span>
            </div>

            <select
              value={filterBranch}
              onChange={(e) => {
                setFilterBranch(e.target.value)
                fetchData(token)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Branches</option>
              <option value="North Campus">North Campus</option>
              <option value="South Campus">South Campus</option>
              <option value="East Campus">East Campus</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                fetchData(token)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={() => fetchData(token)}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <RefreshCw className="animate-spin mx-auto text-primary-600" size={32} />
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No enquiries found
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {enquiry.enquiryId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.parentName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${enquiry.email}`} className="text-blue-600 hover:underline">
                            {enquiry.email}
                          </a>
                          <a href={`tel:${enquiry.phone}`} className="text-blue-600 hover:underline">
                            {enquiry.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.branch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(enquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(enquiry.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
