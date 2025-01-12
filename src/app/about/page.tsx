import { Metadata } from 'next'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'About Us | Health Blog',
  description: 'Learn about our mission to provide comprehensive health information and support for the sickle cell community.',
}

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Medical Director',
    image: '/images/team/sarah.jpg',
    bio: 'Dr. Johnson has over 15 years of experience in hematology and sickle cell disease treatment.'
  },
  {
    name: 'Michael Chen',
    role: 'Community Outreach Director',
    image: '/images/team/michael.jpg',
    bio: 'Michael leads our community engagement initiatives and support group programs.'
  },
  {
    name: 'Lisa Thompson',
    role: 'Research Coordinator',
    image: '/images/team/lisa.jpg',
    bio: 'Lisa oversees our research programs and partnerships with medical institutions.'
  }
]

const stats = [
  { label: 'Community Members', value: '10,000+' },
  { label: 'Support Groups', value: '50+' },
  { label: 'Research Papers', value: '100+' },
  { label: 'Countries Reached', value: '25+' }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-r from-primary-blue to-blue-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="About Us Hero"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Mission & Vision
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Empowering the sickle cell community through education, support, and advocacy.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2020, our organization has been dedicated to providing comprehensive
              support and resources for individuals affected by sickle cell disease. We believe
              in the power of education, community support, and advocacy to improve the lives
              of those living with sickle cell disease.
            </p>
            <p className="text-lg text-gray-600">
              Through our various programs and initiatives, we work tirelessly to raise
              awareness, provide support services, and fund research for better treatments
              and ultimately a cure.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-blue mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary-blue mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary-blue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously seeking new ways to improve treatment and support for the sickle cell community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary-blue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-600">
                Building a strong, supportive network for patients, families, and caregivers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary-blue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">
                Maintaining the highest standards in our research, education, and support programs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
