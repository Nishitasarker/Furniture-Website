"use client"
import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-orange-500">FurniStore</h2>
          <p className="text-sm leading-relaxed">
            Transforming your living spaces with premium furniture. 
            Quality craftsmanship meets modern design for your comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 border-l-4 border-orange-500 pl-3">Quick Links</h3>
          <ul className="space-y-3">
            {['About Us', 'Services', 'Blog', 'Helpdesk', 'Terms & Conditions'].map((link) => (
              <li key={link}>
                <a href={`/${link.toLowerCase().replace(/ & /g, '-').replace(' ', '-')}`} 
                   className="hover:text-orange-500 transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 border-l-4 border-orange-500 pl-3">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-500" /> 
              <span>Mirpur DOHS, Dhaka</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-500" /> 
              <span>+880 13XXXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500" /> 
              <span>support@furnistore.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 border-l-4 border-orange-500 pl-3">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe for the latest updates and exclusive offers.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500 text-white"
            />
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Socials & Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm">&copy; 2026 FurniStore. All rights reserved.</p>
        <div className="flex gap-6 text-xl">
          <FaFacebookF className="cursor-pointer hover:text-orange-500 transition-colors" />
          <FaInstagram className="cursor-pointer hover:text-orange-500 transition-colors" />
          <FaTwitter className="cursor-pointer hover:text-orange-500 transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;