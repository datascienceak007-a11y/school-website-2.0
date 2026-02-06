import type { Metadata } from 'next'
import { Target, Eye, Heart, Users, Award, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Excellence Academy',
  description: 'Learn about Excellence Academy - our history, mission, vision, and commitment to educational excellence.',
}

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty and ethical behavior',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and community',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We embrace change and foster creative thinking',
    },
  ]

  return (
    <div className="pt-20" data-testid="about-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">About Excellence Academy</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over 25 years, Excellence Academy has been at the forefront of educational innovation, 
              nurturing young minds and shaping future leaders across our three distinguished campuses.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20" data-testid="story-section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1995 with a vision to provide world-class education, Excellence Academy began 
                  its journey with a single campus and 200 students. Today, we proud to serve over 5,000 
                  students across three state-of-the-art campuses.
                </p>
                <p>
                  Our founders believed that education should go beyond textbooks and examinations. This 
                  philosophy continues to guide us as we create an environment where students can explore, 
                  discover, and develop their unique talents.
                </p>
                <p>
                  Over the years, we've evolved with changing educational landscapes while staying true to 
                  our core values of integrity, excellence, and holistic development.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop"
                alt="School building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20" data-testid="mission-vision-section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide a nurturing and stimulating environment that empowers students to achieve 
                academic excellence, develop critical thinking skills, and grow into responsible global 
                citizens with strong moral values.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as a leading educational institution that sets benchmarks in holistic 
                education, innovation, and character development, creating future leaders who contribute 
                positively to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20" data-testid="values-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Our Core Values</h2>
            <p className="section-subtitle mx-auto">
              These principles guide every decision we make and every action we take
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-testid={`value-card-${index}`}
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20" data-testid="leadership-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Leadership</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Meet the visionaries guiding Excellence Academy toward continued success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Dr. Sarah Johnson', role: 'Principal & Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
              { name: 'Mr. Michael Chen', role: 'Academic Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
              { name: 'Ms. Emily Rodriguez', role: 'Dean of Students', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
            ].map((leader, index) => (
              <div key={index} className="text-center" data-testid={`leader-card-${index}`}>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                <p className="text-primary-100">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
