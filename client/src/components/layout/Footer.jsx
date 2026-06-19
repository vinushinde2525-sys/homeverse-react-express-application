// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const COMPANY_LINKS = ['About', 'Blog', 'All Properties', 'Locations Map', 'FAQ', 'Contact Us'];
const SERVICE_LINKS = ['Property Search', 'Wish List', 'My Account', 'Terms & Conditions', 'Promotions', 'Agent Login'];
const CARE_LINKS    = ['How It Works', 'FAQ', 'Contact Us', 'Privacy Policy', 'Cookie Policy', 'Sitemap'];

export default function Footer() {
  return (
    <footer className="bg-dark-800 text-gray-300">
      {/* ── Top section ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-5">
              <img src="/assets/images/logo-light.png" alt="Homeverse" className="h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Your trusted partner in finding the perfect home. Over 1,000 premium listings across NYC and Chicago.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { Icon: MapPin,  text: 'Brooklyn, New York, United States' },
                { Icon: Phone,   text: '+0123-456789', href: 'tel:+0123456789' },
                { Icon: Mail,    text: 'contact@homeverse.com', href: 'mailto:contact@homeverse.com' },
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a href={href} className="flex items-start gap-2.5 text-sm hover:text-primary-400 transition-colors">
                      <Icon size={15} className="text-primary-400 mt-0.5 shrink-0" />
                      <span>{text}</span>
                    </a>
                  ) : (
                    <span className="flex items-start gap-2.5 text-sm">
                      <Icon size={15} className="text-primary-400 mt-0.5 shrink-0" />
                      <span>{text}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-dark-700 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(label => (
                <li key={label}>
                  <Link to="#" className="text-sm flex items-center gap-1.5 text-gray-400 hover:text-primary-400 transition-colors group">
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Services</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(label => (
                <li key={label}>
                  <Link to="#" className="text-sm flex items-center gap-1.5 text-gray-400 hover:text-primary-400 transition-colors group">
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest property listings and market news.</p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2.5 bg-dark-700 text-sm text-white placeholder-gray-500 border border-dark-600 rounded-l-lg focus:outline-none focus:border-primary-500"
              />
              <button className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-r-lg transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────── */}
      <div className="border-t border-dark-700 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="text-primary-400">Homeverse</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-gray-500">
            {CARE_LINKS.slice(0, 3).map(label => (
              <Link key={label} to="#" className="hover:text-primary-400 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
