import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">The-Experimentation</h3>
            <p className="text-blue-200">
              Making science accessible and engaging through interactive experiments and clear explanations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/articles" className="text-blue-200 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/experiments" className="text-blue-200 hover:text-white transition-colors">
                  Experiments
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-blue-200 hover:text-white transition-colors">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/TheExperimentation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/A2DIGIHUB/The-Experimentation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/company/the-experimentation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} The-Experimentation. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
