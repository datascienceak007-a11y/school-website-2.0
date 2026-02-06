import type { Metadata } from 'next'
import { BookOpen, Microscope, Calculator, Globe, Palette, Music, Code, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Academics - Excellence Academy',
  description: 'Explore our comprehensive academic programs designed to nurture well-rounded, future-ready students.',
}

export default function AcademicsPage() {
  const programs = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Language Arts',
      description: 'Comprehensive English and multilingual programs',
      subjects: ['English', 'Spanish', 'French', 'Creative Writing'],
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: 'Sciences',
      description: 'Hands-on learning with modern lab facilities',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Mathematics',
      description: 'Building strong analytical and problem-solving skills',
      subjects: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Social Studies',
      description: 'Understanding our world and global citizenship',
      subjects: ['History', 'Geography', 'Economics', 'Civics'],
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Technology',
      description: 'Preparing students for the digital future',
      subjects: ['Computer Science', 'Robotics', 'AI Basics', 'Web Development'],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Arts',
      description: 'Nurturing creativity and self-expression',
      subjects: ['Visual Arts', 'Drama', 'Crafts', 'Digital Design'],
    },
  ]

  const features = [
    {
      title: 'CBSE Curriculum',
      description: 'Aligned with the latest CBSE guidelines and standards',
    },
    {
      title: 'Smart Classrooms',
      description: 'Interactive digital boards and modern teaching aids',
    },
    {
      title: 'Project-Based Learning',
      description: 'Hands-on projects that develop practical skills',
    },
    {
      title: 'Regular Assessments',
      description: 'Continuous evaluation to track student progress',
    },
  ]

  return (
    <div className="pt-20" data-testid="academics-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">Academic Excellence</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our comprehensive curriculum is designed to challenge and inspire students, 
              preparing them for success in higher education and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20" data-testid="programs-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Our Academic Programs</h2>
            <p className="section-subtitle mx-auto">
              A well-rounded education covering all essential disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`program-card-${index}`}
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Key Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20" data-testid="features-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Learning Methodology</h2>
            <p className="section-subtitle mx-auto">
              Modern teaching approaches that engage and inspire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center"
                data-testid={`feature-${index}`}
              >
                <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Structure */}
      <section className="py-20" data-testid="grade-structure">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Grade Structure</h2>
              <p className="section-subtitle mx-auto">
                Age-appropriate learning from Pre-K to Grade 12
              </p>
            </div>

            <div className="space-y-6">
              {[
                { level: 'Primary School', grades: 'Pre-K to Grade 5', focus: 'Foundation building, basic literacy and numeracy, social skills' },
                { level: 'Middle School', grades: 'Grade 6 to Grade 8', focus: 'Critical thinking, subject specialization, leadership development' },
                { level: 'High School', grades: 'Grade 9 to Grade 12', focus: 'Advanced academics, college preparation, career guidance' },
              ].map((level, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                  data-testid={`grade-level-${index}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.level}</h3>
                      <p className="text-primary-600 font-semibold mb-3">{level.grades}</p>
                      <p className="text-gray-600">{level.focus}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block bg-primary-100 text-primary-700 px-6 py-2 rounded-full text-sm font-semibold">
                        Ages {index === 0 ? '3-11' : index === 1 ? '11-14' : '14-18'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Beyond Academics</h2>
            <p className="text-xl text-primary-100 mb-12">
              We believe in holistic development through sports, arts, and community service
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Music className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Arts & Music</h3>
                <p className="text-primary-100 text-sm">Dance, drama, instruments, choir</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Sports</h3>
                <p className="text-primary-100 text-sm">Basketball, soccer, swimming, athletics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Globe className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Clubs</h3>
                <p className="text-primary-100 text-sm">Debate, robotics, environment, volunteering</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
