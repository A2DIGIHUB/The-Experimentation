import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartPulse, 
  faDna, 
  faMicroscope,
  faFlask,
  faUserDoctor,
  faBrain
} from '@fortawesome/free-solid-svg-icons';
import NewsletterSignup from '@/components/NewsletterSignup';
import HeroSection from '@/components/HeroSection';
import PublicationCarousel from '@/components/PublicationCarousel';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Featured Research Areas</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Exploring the intersection of medical science and patient care through innovative research and clinical studies.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faDna} className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Genetic Studies</h3>
                <p className="text-gray-600 mb-4">
                  Understanding genetic factors in sickle cell disease and developing targeted therapies.
                </p>
                <Link href="/research/genetics" className="text-teal-600 hover:text-teal-700 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faFlask} className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Clinical Trials</h3>
                <p className="text-gray-600 mb-4">
                  Advancing treatment options through rigorous clinical research and patient studies.
                </p>
                <Link href="/research/trials" className="text-blue-600 hover:text-blue-700 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faMicroscope} className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Laboratory Research</h3>
                <p className="text-gray-600 mb-4">
                  Investigating cellular mechanisms and developing new diagnostic tools.
                </p>
                <Link href="/research/lab" className="text-purple-600 hover:text-purple-700 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publication Carousel */}
      <PublicationCarousel />

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-teal-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: faUserDoctor, value: "50+", label: "Medical Researchers" },
              { icon: faFlask, value: "100+", label: "Active Studies" },
              { icon: faBrain, value: "1000+", label: "Patients Enrolled" },
              { icon: faHeartPulse, value: "25+", label: "Research Papers" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                  <FontAwesomeIcon icon={stat.icon} className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </main>
  );
}
