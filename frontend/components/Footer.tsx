import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Academics', href: '/academics' },
    { name: 'Branches', href: '/branches' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const branches = [
    { name: 'North Campus', phone: '+1 234 567 8901' },
    { name: 'South Campus', phone: '+1 234 567 8902' },
    { name: 'East Campus', phone: '+1 234 567 8903' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300" data-testid="footer">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">EA</span>
              </div>
              <h3 className="text-white font-bold text-lg font-display">Excellence Academy</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Nurturing young minds since 1995. We provide world-class education with a focus on holistic development and excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Branches */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Our Branches</h4>
            <ul className="space-y-3">
              {branches.map((branch) => (
                <li key={branch.name} className="text-sm">
                  <p className="text-white font-medium">{branch.name}</p>
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1 mt-1"
                  >
                    <Phone size={14} />
                    {branch.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:info@excellenceacademy.edu" className="hover:text-primary-400 transition-colors">
                  info@excellenceacademy.edu
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+12345678900" className="hover:text-primary-400 transition-colors">
                  +1 234 567 8900
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Education Street, Knowledge City, ST 12345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Excellence Academy. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
