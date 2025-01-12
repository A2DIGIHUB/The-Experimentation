import Image from 'next/image'
import DonationForm from '@/components/DonationForm'
import ImpactStats from '@/components/ImpactStats'
import PatientStories from '@/components/PatientStories'
import ResourceLibrary from '@/components/ResourceLibrary'
import EventCalendar from '@/components/EventCalendar'

export const metadata = {
  title: 'Sickle Cell Foundation | Health & Wellness Blog',
  description: 'Support our mission to help those affected by Sickle Cell Disease through research, education, and community support.',
}

export default function SickleCellPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-secondary-teal opacity-90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/sickle-cell-hero.jpg"
            alt="Sickle Cell Foundation"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center container-custom">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Together We Can Make a Difference
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our mission to support those affected by Sickle Cell Disease through research, education, and community outreach.
          </p>
          <a href="#donate" className="btn-primary bg-white text-primary-blue hover:bg-gray-100">
            Donate Now
          </a>
        </div>
      </section>

      {/* Impact Statistics */}
      <ImpactStats />

      {/* Patient Stories */}
      <PatientStories />

      {/* Donation Section */}
      <section id="donate" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Support Our Cause
            </h2>
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <ResourceLibrary />

      {/* Event Calendar */}
      <EventCalendar />
    </div>
  )
}
