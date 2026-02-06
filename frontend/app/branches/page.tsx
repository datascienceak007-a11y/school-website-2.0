'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Users, Building } from 'lucide-react'

const branches = [
  {
    id: 'north',
    name: 'North Campus',
    tagline: 'Where Excellence Begins',
    address: '123 Education Street, North District, City 12345',
    phone: '+1 234 567 8901',
    email: 'north@excellenceacademy.edu',
    timing: 'Mon-Fri: 7:30 AM - 3:30 PM',
    students: '2,000+',
    established: '1995',
    grades: 'Pre-K to Grade 12',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    facilities: ['Science Labs', 'Sports Complex', 'Library', 'Computer Labs', 'Auditorium'],
    highlights: [
      'Original flagship campus',
      'State-of-the-art infrastructure',
      'Award-winning debate team',
      'Olympic-size swimming pool',
    ],
  },
  {
    id: 'south',
    name: 'South Campus',
    tagline: 'Innovation Hub',
    address: '456 Knowledge Avenue, South District, City 12346',
    phone: '+1 234 567 8902',
    email: 'south@excellenceacademy.edu',
    timing: 'Mon-Fri: 7:30 AM - 3:30 PM',
    students: '1,800+',
    established: '2005',
    grades: 'Pre-K to Grade 12',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    facilities: ['Robotics Lab', 'Music Studio', 'Art Gallery', 'Indoor Stadium', 'Cafeteria'],
    highlights: [
      'Focus on STEM education',
      'AI and Robotics programs',
      'International exchange programs',
      'Green campus initiative',
    ],
  },
  {
    id: 'east',
    name: 'East Campus',
    tagline: 'Global Learning Center',
    address: '789 Wisdom Boulevard, East District, City 12347',
    phone: '+1 234 567 8903',
    email: 'east@excellenceacademy.edu',
    timing: 'Mon-Fri: 7:30 AM - 3:30 PM',
    students: '1,500+',
    established: '2015',
    grades: 'Pre-K to Grade 12',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    facilities: ['Language Labs', 'Meditation Center', 'Basketball Courts', 'Theatre', 'Playground'],
    highlights: [
      'Newest and most modern campus',
      'Focus on arts and humanities',
      'Multilingual curriculum',
      'Wellness and mindfulness programs',
    ],
  },
]

export default function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])

  return (
    <div className="pt-20" data-testid="branches-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">Our Branches</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Excellence Academy operates three world-class campuses, each designed to provide 
              the best learning environment for your child.
            </p>
          </div>
        </div>
      </section>

      {/* Branch Selector */}
      <section className="py-12 bg-white border-b" data-testid="branch-selector">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  selectedBranch.id === branch.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`branch-selector-${branch.id}`}
              >
                {branch.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Branch Details */}
      <section className="py-20" data-testid="branch-details">
        <div className="container">
          {/* Branch Header */}
          <div className="mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3 font-display">
                  {selectedBranch.name}
                </h2>
                <p className="text-xl text-primary-600 font-semibold mb-6">
                  {selectedBranch.tagline}
                </p>
                <p className="text-gray-600 mb-8">
                  Established in {selectedBranch.established}, serving {selectedBranch.students} students from {selectedBranch.grades}
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{selectedBranch.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary-600 flex-shrink-0" size={20} />
                    <a href={`tel:${selectedBranch.phone}`} className="text-gray-700 hover:text-primary-600">
                      {selectedBranch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary-600 flex-shrink-0" size={20} />
                    <a href={`mailto:${selectedBranch.email}`} className="text-gray-700 hover:text-primary-600">
                      {selectedBranch.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-primary-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{selectedBranch.timing}</span>
                  </div>
                </div>
              </div>

              {/* Branch Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedBranch.image}
                  alt={selectedBranch.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Facilities & Highlights */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Facilities */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                  <Building size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Facilities</h3>
              </div>
              <ul className="space-y-3">
                {selectedBranch.facilities.map((facility, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">{facility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div className="bg-accent-50 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Highlights</h3>
              </div>
              <ul className="space-y-3">
                {selectedBranch.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* All Branches Overview */}
      <section className="bg-gray-50 py-20" data-testid="all-branches-overview">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Compare Our Campuses</h2>
            <p className="section-subtitle mx-auto">
              Each campus offers unique advantages while maintaining our high standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-testid={`branch-card-${branch.id}`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{branch.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{branch.tagline}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <p><strong>Est:</strong> {branch.established}</p>
                    <p><strong>Students:</strong> {branch.students}</p>
                    <p><strong>Grades:</strong> {branch.grades}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBranch(branch)}
                    className="w-full btn-outline text-sm py-2.5"
                    data-testid={`view-details-${branch.id}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
