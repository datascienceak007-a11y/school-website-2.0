'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const categories = ['All', 'Campus', 'Classrooms', 'Sports', 'Events', 'Activities']

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop', category: 'Campus', alt: 'School campus exterior' },
  { id: 2, src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop', category: 'Classrooms', alt: 'Students in classroom' },
  { id: 3, src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop', category: 'Classrooms', alt: 'Interactive learning session' },
  { id: 4, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', category: 'Activities', alt: 'Group study' },
  { id: 5, src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop', category: 'Sports', alt: 'Sports activities' },
  { id: 6, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop', category: 'Events', alt: 'Graduation ceremony' },
  { id: 7, src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop', category: 'Sports', alt: 'Soccer practice' },
  { id: 8, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop', category: 'Campus', alt: 'Library' },
  { id: 9, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', category: 'Activities', alt: 'Science lab' },
  { id: 10, src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop', category: 'Events', alt: 'Annual day celebration' },
  { id: 11, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop', category: 'Classrooms', alt: 'Computer lab' },
  { id: 12, src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop', category: 'Campus', alt: 'School building' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div className="pt-20" data-testid="gallery-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">Our Gallery</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our vibrant campus life, modern facilities, and memorable moments 
              captured throughout the academic year.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b" data-testid="category-filter">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`category-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50" data-testid="gallery-grid">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image)}
                data-testid={`gallery-image-${image.id}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          data-testid="lightbox-modal"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            data-testid="close-lightbox"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div className="max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            Experience It Yourself!
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Schedule a campus tour to see our facilities in person and meet our faculty.
          </p>
          <a
            href="/contact"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
            data-testid="schedule-tour-button"
          >
            Schedule a Tour
          </a>
        </div>
      </section>
    </div>
  )
}
