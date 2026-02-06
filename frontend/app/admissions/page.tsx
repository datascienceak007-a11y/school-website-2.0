'use client'

import { useState } from 'react'
import { Send, User, Mail, Phone, MapPin, MessageSquare, Loader } from 'lucide-react'

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    branch: '',
    grade: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const branches = ['North Campus', 'South Campus', 'East Campus']
  const grades = ['Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          branch: '',
          grade: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20" data-testid="admissions-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold">
                🎓 Admissions Open 2025-26
              </span>
            </div>
            <h1 className="section-title mb-6">Begin Your Journey With Us</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Take the first step towards your child's bright future. Fill out our admission enquiry form 
              and our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gray-50" data-testid="admission-process">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Simple Admission Process</h2>
            <p className="section-subtitle mx-auto">
              We've made the admission process straightforward and hassle-free
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Submit Enquiry', desc: 'Fill out the online form' },
              { step: '2', title: 'Campus Visit', desc: 'Schedule a tour of our facilities' },
              { step: '3', title: 'Application', desc: 'Complete the formal application' },
              { step: '4', title: 'Enrollment', desc: 'Welcome to Excellence Academy!' },
            ].map((item, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index}`}>
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-20" data-testid="enquiry-form-section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8">
                <h2 className="text-3xl font-bold mb-2 font-display">Admission Enquiry Form</h2>
                <p className="text-primary-100">
                  Please fill in your details and we'll contact you shortly
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6" data-testid="admission-enquiry-form">
                {/* Student Name */}
                <div>
                  <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter student's full name"
                      data-testid="input-student-name"
                    />
                  </div>
                </div>

                {/* Parent Name */}
                <div>
                  <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter parent/guardian name"
                      data-testid="input-parent-name"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+1 234 567 8900"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                </div>

                {/* Branch & Grade */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="branch" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Branch *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                        data-testid="select-branch"
                      >
                        <option value="">Select a branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-2">
                      Grade Applying For *
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                      data-testid="select-grade"
                    >
                      <option value="">Select grade</option>
                      {grades.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Any specific questions or requirements..."
                      data-testid="textarea-message"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="submit-enquiry-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Enquiry
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg" data-testid="success-message">
                    <p className="font-semibold">Thank you for your enquiry!</p>
                    <p className="text-sm">We'll contact you within 24 hours.</p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg" data-testid="error-message">
                    <p className="font-semibold">Something went wrong!</p>
                    <p className="text-sm">Please try again or contact us directly.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Apply Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Why Choose Excellence Academy?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-5xl font-bold mb-2">98%</div>
                <p className="text-primary-100">College Acceptance Rate</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">5000+</div>
                <p className="text-primary-100">Happy Students</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">25+</div>
                <p className="text-primary-100">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
