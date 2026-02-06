'use client'

import { MessageCircle } from 'lucide-react'

const WhatsAppFloat = () => {
  const whatsappNumber = '1234567890' // Replace with actual WhatsApp number
  const message = 'Hi! I would like to enquire about admissions at Excellence Academy.'

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      data-testid="whatsapp-float-button"
      aria-label="Enquire on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Enquire Now
      </span>
    </button>
  )
}

export default WhatsAppFloat
