'use client';
import React, { useState } from 'react';
import { Sofa } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { 
  FaFacebookF, 
  FaWhatsapp, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt 
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const pathname = usePathname();

  // Dashboard বা এর অন্তর্গত যেকোনো পেজে গেলে Footer দেখাবে না
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-300 text-gray-700 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sofa size={32} className="text-orange-600" />
            <span 
              className="text-3xl font-bold text-gray-800 tracking-tight" 
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              FURNS
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Transforming your living spaces with premium furniture. Quality craftsmanship meets modern design for your absolute comfort.
          </p>
        </div>

        {/* Essential Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3">Essential Links</h3>
          <ul className="space-y-3">
            {[
              { name: 'Products', path: '/productsPage' },
              { name: 'About Us', path: '/About' },
              { name: 'Blog', path: '/interior-tips' },
              { name: 'Contact', path: 'mailto:nishitasarkerjui@gmail.com' },
            ].map((link) => (
              <li key={link.name}>
                <a href={link.path} className="hover:text-orange-600 transition-colors duration-300">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-600" /> 
              <span>Mirpur, Dhaka</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-600" /> 
              <span>+880 1859384536</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-orange-600" /> 
              <a href="mailto:nishitasarkerjui@gmail.com?subject=Inquiry%20from%20Website&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20furniture." className="hover:text-orange-600 transition-colors">
                nishitasarkerjui@gmail.com 
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-orange-600" /> 
              <a href="https://wa.me/8801859384536" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors"> 
                +880 1859384536 
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3">Newsletter</h3>
          <p className="text-sm mb-4 text-gray-600">Subscribe for the latest updates and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required
              className="w-full p-3 rounded bg-white border border-gray-300 focus:outline-none focus:border-orange-500"
            />
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Socials & Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500">&copy; 2026 FurniStore. All rights reserved.</p>
        <div className="flex gap-6 text-xl text-gray-600">
          <a href="https://www.facebook.com/100080777081861/posts/962049083164319/?substory_index=1745046966465629&app=fbl" className="hover:text-orange-600 transition-colors" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://wa.me/8801859384536" className="hover:text-orange-600 transition-colors" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="https://www.linkedin.com/in/nishitasarkerjui" className="hover:text-orange-600 transition-colors" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="mailto:nishitasarkerjui@gmail.com?subject=Inquiry%20from%20Website&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20furniture." className="hover:text-orange-600 transition-colors" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;