'use client'

import { useState, useEffect } from 'react'
import { Megaphone, X, AlertCircle } from 'lucide-react'

interface Announcement {
  _id: string
  announcementId: string
  title: string
  message: string
  isImportant: boolean
  isPinned: boolean
  startDate: string
  expiryDate?: string
}

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    if (announcements.length === 0 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000) // Change announcement every 5 seconds

    return () => clearInterval(interval)
  }, [announcements.length, isPaused])

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/announcements/active`
      )
      const data = await response.json()
      if (data.success && data.data.length > 0) {
        setAnnouncements(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
    }
  }

  if (!isVisible || announcements.length === 0) {
    return null
  }

  const currentAnnouncement = announcements[currentIndex]

  return (
    <div
      className={`fixed top-20 left-0 right-0 z-40 ${
        currentAnnouncement?.isImportant
          ? 'bg-gradient-to-r from-red-600 to-red-700'
          : 'bg-gradient-to-r from-primary-600 to-primary-700'
      } text-white shadow-lg`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-testid="announcement-ticker"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            {currentAnnouncement?.isImportant ? (
              <AlertCircle size={24} className="animate-pulse" />
            ) : (
              <Megaphone size={24} />
            )}
          </div>

          {/* Badge */}
          {currentAnnouncement?.isPinned && (
            <span className="flex-shrink-0 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
              Pinned
            </span>
          )}

          {currentAnnouncement?.isImportant && (
            <span className="flex-shrink-0 bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
              Important
            </span>
          )}

          {/* Announcement Content */}
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee-slow">
              <span className="font-bold mr-2">{currentAnnouncement?.title}:</span>
              <span>{currentAnnouncement?.message}</span>
            </div>
          </div>

          {/* Navigation Dots */}
          {announcements.length > 1 && (
            <div className="flex gap-1.5 flex-shrink-0">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Go to announcement ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Close announcements"
            data-testid="close-announcement"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {!isPaused && announcements.length > 1 && (
        <div className="h-1 bg-white/20 relative overflow-hidden">
          <div
            className="h-full bg-white absolute left-0 top-0"
            style={{
              animation: 'progress 5s linear',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes marquee-slow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-10%);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-marquee-slow {
          display: inline-block;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .animate-marquee-slow {
            animation: marquee-slow 20s linear infinite;
          }
        }
      `}</style>
    </div>
  )
}
