import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, Users, Award, TrendingUp, CheckCircle, Star, ArrowRight, BookOpen, Trophy, Heart } from 'lucide-react'
import HeroCarousel from '@/components/HeroCarousel'

export const metadata: Metadata = {
  title: 'Home - Excellence Academy | Premier Education Institution',
  description: 'Welcome to Excellence Academy - Where future leaders are shaped. Admissions open for 2025-26 across 3 campuses.',
}

export default function HomePage() {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Expert Faculty',
      description: 'Learn from highly qualified educators with years of experience',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Excellence in Sports',
      description: 'State-of-the-art sports facilities and championship training',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Modern Curriculum',
      description: 'Updated syllabus aligned with global education standards',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Holistic Development',
      description: 'Focus on overall personality and character building',
    },
  ]

  const stats = [
    { number: '5000+', label: 'Happy Students' },
    { number: '98%', label: 'Success Rate' },
    { number: '3', label: 'Campuses' },
    { number: '25+', label: 'Years of Excellence' },
  ]

  const achievements = [
    'Top-ranked school in the region for 5 consecutive years',
    '100+ national and international awards',
    'Alumni placed in top universities worldwide',
    'State-of-the-art infrastructure and technology',
  ]

  return (
    <div className="pt-20" data-testid="home-page">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="bg-primary-600 text-white py-16" data-testid="stats-section">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" data-testid="features-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Excellence Academy?</h2>
            <p className="section-subtitle mx-auto mt-4">
              We provide a nurturing environment where every child can thrive and excel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-testid={`feature-card-${index}`}
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20" data-testid="achievements-section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🏆 Our Achievements
                </span>
              </div>
              <h2 className="section-title mb-6">Award-Winning Excellence</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to quality education has earned us numerous accolades and recognition from educational bodies nationwide.
              </p>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="text-accent-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop"
                  alt="Students studying"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop"
                  alt="Sports activities"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop"
                  alt="Graduation ceremony"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop"
                  alt="School facilities"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20" data-testid="final-cta-section">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display">
            Ready to Join Excellence Academy?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Limited seats available! Apply now to secure your child's place in our upcoming academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              data-testid="final-cta-apply-button"
            >
              Start Your Application
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              data-testid="final-cta-contact-button"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
