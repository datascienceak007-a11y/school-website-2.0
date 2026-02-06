# 🏫 Excellence Academy - School Website

A modern, production-ready school website built with Next.js 14, featuring a clean design focused on increasing admissions with multi-branch support.

## 🚀 Features

### Pages
- **Home**: Hero section with strong admission CTAs, stats, features showcase
- **About**: School history, mission, vision, values, and leadership
- **Branches**: Interactive selector for 3 campuses with detailed information
- **Admissions**: Complete online enquiry form with multi-step process visualization
- **Academics**: Programs, curriculum, grade structure, and extracurriculars
- **Gallery**: Image gallery with category filtering and lightbox view
- **Contact**: Branch selector, contact information, Google Maps integration, and contact form

### Key Features
✅ Modern, premium, human-designed UI
✅ Mobile-first and fully responsive design
✅ SEO-friendly structure with proper meta tags
✅ Floating WhatsApp "Enquire Now" button
✅ Image optimization with Next.js Image component
✅ Clean typography with Google Fonts (Inter + Poppins)
✅ Smooth animations and transitions
✅ Multi-branch support (3 campuses)
✅ Interactive forms with validation
✅ Accessible components with ARIA labels

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter (body), Poppins (display)

### Project Structure
```
/app/frontend/
├── app/
│   ├── layout.tsx              # Root layout with navigation & footer
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles & Tailwind config
│   ├── about/page.tsx          # About page
│   ├── branches/page.tsx       # Branches page (client component)
│   ├── admissions/page.tsx     # Admissions form page (client component)
│   ├── academics/page.tsx      # Academics page
│   ├── gallery/page.tsx        # Gallery page (client component)
│   └── contact/page.tsx        # Contact page (client component)
├── components/
│   ├── Navigation.tsx          # Responsive navigation header
│   ├── Footer.tsx              # Footer with links and info
│   └── WhatsAppFloat.tsx       # Floating WhatsApp button
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.local                  # Environment variables
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Trust, professionalism
- **Accent**: Orange (#f97316) - Energy, CTAs
- **Background**: White/Gray tones
- **Text**: Gray-900 for headings, Gray-600/700 for body

### Typography
- **Display**: Poppins (headings, hero text)
- **Body**: Inter (content, navigation)

### Components
- Cards with hover effects
- Gradient backgrounds
- Shadow elevations
- Rounded corners (lg, xl, 2xl)
- Consistent spacing

## 📱 Responsive Design

- **Mobile**: < 768px (single column, hamburger menu)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (full layout, 4 columns)

## 🚀 Getting Started

### Installation

```bash
cd frontend
yarn install
```

### Development

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
yarn build
yarn start
```

## 📄 Pages Overview

### 1. Home (`/`)
- Hero section with admission CTA
- Statistics (5000+ students, 98% success rate)
- Feature cards
- Achievements showcase
- Final CTA section

### 2. About (`/about`)
- School story and history
- Mission and vision cards
- Core values
- Leadership team profiles

### 3. Branches (`/branches`)
- Interactive branch selector
- Detailed campus information
- Contact details per branch
- Facilities and highlights
- Comparison cards for all branches

### 4. Admissions (`/admissions`)
- Admission process steps
- Online enquiry form with validation
  - Student name
  - Parent/guardian name
  - Email, phone
  - Branch preference (dropdown)
  - Grade selection
  - Additional message
- Success confirmation

### 5. Academics (`/academics`)
- Academic programs showcase
  - Language Arts
  - Sciences
  - Mathematics
  - Social Studies
  - Technology
  - Arts
- Learning methodology
- Grade structure (Primary, Middle, High)
- Extracurricular activities

### 6. Gallery (`/gallery`)
- Category filtering (All, Campus, Classrooms, Sports, Events, Activities)
- Image grid with lazy loading
- Lightbox modal for full-view
- Next.js Image optimization

### 7. Contact (`/contact`)
- Branch selector tabs
- Contact information display
- Google Maps embed
- WhatsApp CTA button
- Contact form
  - Name, email, phone
  - Subject dropdown
  - Message textarea

## 🎯 SEO Optimization

- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Meta tags for each page
- Open Graph tags
- Alt text for all images
- Descriptive link text
- Mobile-friendly
- Fast loading times

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast compliance
- Screen reader friendly
- Semantic HTML
- data-testid attributes for testing

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

### Tailwind Configuration

Custom theme extensions in `tailwind.config.js`:
- Primary and accent color palettes
- Custom animations (fade-in, slide-up)
- Font family variables
- Custom component classes

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next": "^14.2.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

## 🎨 Custom Components

### Navigation
- Fixed header with scroll effects
- Responsive hamburger menu for mobile
- Active state indicators
- Prominent "Apply Now" CTA

### WhatsApp Float
- Fixed position bottom-right
- Hover tooltip
- Opens WhatsApp with pre-filled message
- Green color scheme

### Footer
- 4-column grid layout
- Quick links
- Branch contact info
- Social media icons
- Copyright and policies

## 🌐 Image Sources

All images are sourced from Unsplash with proper optimization:
- Hero images
- Campus photos
- Student activities
- Facilities showcases

## 🔮 Future Enhancements

- Backend API integration
- Real admission form submission
- Content Management System (CMS)
- Blog section
- Student portal
- Parent portal
- Online payment integration
- Virtual campus tours
- Live chat support

## 📝 Notes

- No dummy content - all text is meaningful and realistic
- Professional school branding (Excellence Academy)
- Focus on admission conversion
- Clean, premium design aesthetic
- Production-ready code structure
- TypeScript for type safety
- No AI branding or watermarks

## 🤝 Contributing

This is a production-ready school website template. Feel free to customize:
- School name and branding
- Color scheme in Tailwind config
- Branch information
- Contact details
- Images

## 📄 License

This project structure and design can be used as a template for school websites.

---

**Built with ❤️ for Excellence Academy**
