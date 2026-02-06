'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, BookOpen, Filter, Search } from 'lucide-react'

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
  createdAt: string
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

export default function SyllabusContent() {
  const [syllabusList, setSyllabusList] = useState<Syllabus[]>([])
  const [filteredList, setFilteredList] = useState<Syllabus[]>([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const subjects = Array.from(new Set(syllabusList.map((s) => s.subject))).sort()

  useEffect(() => {
    fetchSyllabus()
  }, [])

  useEffect(() => {
    filterSyllabus()
  }, [selectedClass, selectedSubject, searchTerm, syllabusList])

  const fetchSyllabus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/syllabus/active`
      )
      const data = await response.json()
      if (data.success) {
        setSyllabusList(data.data)
        setFilteredList(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch syllabus:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterSyllabus = () => {
    let filtered = [...syllabusList]

    if (selectedClass) {
      filtered = filtered.filter((s) => s.class === selectedClass)
    }

    if (selectedSubject) {
      filtered = filtered.filter((s) => s.subject === selectedSubject)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredList(filtered)
  }

  const groupedByClass = filteredList.reduce((acc, syllabus) => {
    if (!acc[syllabus.class]) {
      acc[syllabus.class] = []
    }
    acc[syllabus.class].push(syllabus)
    return acc
  }, {} as Record<string, Syllabus[]>)

  return (
    <div className="pt-20" data-testid="syllabus-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-6">
              <BookOpen size={32} />
            </div>
            <h1 className="section-title mb-6">Academic Syllabus</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Download comprehensive syllabus for all classes and subjects. Stay updated with our
              curriculum and academic requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b" data-testid="filters-section">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title, subject..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    data-testid="search-input"
                  />
                </div>
              </div>

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 appearance-none bg-white min-w-[200px]"
                data-testid="class-filter"
              >
                <option value="">All Classes</option>
                {CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 appearance-none bg-white min-w-[200px]"
                data-testid="subject-filter"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filters Display */}
            {(selectedClass || selectedSubject || searchTerm) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedClass && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedClass}
                  </span>
                )}
                {selectedSubject && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedSubject}
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    &quot;{searchTerm}&quot;
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedClass('')
                    setSelectedSubject('')
                    setSearchTerm('')
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Syllabus List */}
      <section className="py-20 bg-gray-50" data-testid="syllabus-list">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading syllabus...</p>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No syllabus found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedClass || selectedSubject
                    ? 'Try adjusting your filters'
                    : 'Syllabus will be available soon'}
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedByClass)
                  .sort(([a], [b]) => {
                    const aNum = parseInt(a.replace('Class ', ''))
                    const bNum = parseInt(b.replace('Class ', ''))
                    return aNum - bNum
                  })
                  .map(([className, syllabuses]) => (
                    <div key={className}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">
                          {className.replace('Class ', '')}
                        </div>
                        {className}
                      </h2>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {syllabuses.map((syllabus) => (
                          <div
                            key={syllabus._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                            data-testid={`syllabus-card-${syllabus._id}`}
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                    {syllabus.subject}
                                  </span>
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {syllabus.title}
                                  </h3>
                                  {syllabus.description && (
                                    <p className="text-sm text-gray-600 mb-3">
                                      {syllabus.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span>Academic Year: {syllabus.academicYear}</span>
                                {syllabus.fileSize && <span>{syllabus.fileSize}</span>}
                              </div>

                              <a
                                href={syllabus.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                data-testid={`download-btn-${syllabus._id}`}
                              >
                                <Download size={20} />
                                Download PDF
                              </a>
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
      </section>

      {/* Info Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-display">Need Help?</h2>
            <p className="text-xl text-primary-100 mb-8">
              If you need assistance with the syllabus or have questions about the curriculum,
              please contact your class teacher or the academic office.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
