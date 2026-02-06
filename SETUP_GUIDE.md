# 🚀 Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- Yarn package manager

## Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd /app/frontend
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Start Development Server
```bash
yarn dev
```

The application will be available at: http://localhost:3000

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Project Structure

```
/app/frontend/
├── app/                        # Next.js App Router
│   ├── about/                  
│   │   └── page.tsx           # About page
│   ├── academics/              
│   │   └── page.tsx           # Academics page
│   ├── admissions/             
│   │   └── page.tsx           # Admissions form page
│   ├── branches/               
│   │   └── page.tsx           # Branches page
│   ├── contact/                
│   │   └── page.tsx           # Contact page
│   ├── gallery/                
│   │   └── page.tsx           # Gallery page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/                 # Reusable components
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── WhatsAppFloat.tsx
├── public/                     # Static assets
├── .env.local                 # Environment variables
├── .eslintrc.json             # ESLint config
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js config
├── package.json               # Dependencies
├── postcss.config.js          # PostCSS config
├── tailwind.config.js         # Tailwind config
└── tsconfig.json              # TypeScript config
```

## Environment Variables

Create a `.env.local` file:

```bash
# API URL (for future backend integration)
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

## Customization Guide

### 1. Update School Branding
Edit the following in components and pages:
- School name: "Excellence Academy"
- Logo: Components/Navigation.tsx
- Tagline: "Shaping Future Leaders"

### 2. Update Branch Information
Edit `/app/branches/page.tsx`:
```typescript
const branches = [
  {
    name: 'Your Branch Name',
    address: 'Your Address',
    phone: 'Your Phone',
    email: 'Your Email',
    // ... other details
  }
]
```

### 3. Update Contact Information
Edit `/app/contact/page.tsx` and `components/Footer.tsx`

### 4. Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* your blue shades */ },
  accent: { /* your orange shades */ }
}
```

### 5. Update WhatsApp Number
Edit `components/WhatsAppFloat.tsx`:
```typescript
const whatsappNumber = 'YOUR_WHATSAPP_NUMBER'
```

### 6. Replace Images
Update image URLs in all page components to use your school's images.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- Build: `yarn build`
- Start: `yarn start` (runs on port 3000)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimizations

✅ Image optimization with Next.js Image
✅ Code splitting by route
✅ Lazy loading
✅ Font optimization
✅ CSS optimization with Tailwind

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors
```bash
# Clean Next.js cache
rm -rf .next
yarn build
```

## Support

For issues or questions, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

**Ready to launch your school website!** 🎓
