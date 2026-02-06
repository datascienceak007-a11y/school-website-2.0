import type { Metadata } from 'next'
import SyllabusContent from './SyllabusContent'

export const metadata: Metadata = {
  title: 'Syllabus - Excellence Academy',
  description: 'Download class-wise and subject-wise syllabus for Excellence Academy. Academic year syllabus available for all classes.',
}

export default function SyllabusPage() {
  return <SyllabusContent />
}
