import React from 'react';
import { Coffee, MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#4E3B31] text-[#FDFBF7] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D97706] p-2 rounded-full">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black">Cafe TAB</h3>
                <p className="text-xs text-[#FDFBF7]/70">Take A Break</p>
              </div>
            </div>
            <p className="text-sm text-[#FDFBF7]/70 leading-relaxed">
              Your perfect break spot in Bihar Sharif. Quality food, warm atmosphere, and memorable moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    data-testid={`footer-link-${link.toLowerCase()}`}
                    className="text-sm text-[#FDFBF7]/70 hover:text-[#D97706] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-[#D97706] flex-shrink-0" />
                <span className="text-sm text-[#FDFBF7]/70">
                  Ghagra, near Allahabad Bank<br />Bihar Sharif, Nalanda
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span className="text-sm text-[#FDFBF7]/70">11:00 AM - 10:00 PM (Daily)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span className="text-sm text-[#FDFBF7]/70">+91 6207725718</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-instagram"
                className="bg-[#FDFBF7]/10 p-3 rounded-full hover:bg-[#D97706] transition-colors group"
              >
                <Instagram className="w-5 h-5 text-[#FDFBF7]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-facebook"
                className="bg-[#FDFBF7]/10 p-3 rounded-full hover:bg-[#D97706] transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#FDFBF7]" />
              </a>
              <a
                href="mailto:info@cafetab.com"
                data-testid="social-email"
                className="bg-[#FDFBF7]/10 p-3 rounded-full hover:bg-[#D97706] transition-colors group"
              >
                <Mail className="w-5 h-5 text-[#FDFBF7]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#FDFBF7]/20 text-center">
          <p className="text-sm text-[#FDFBF7]/70">
            © {new Date().getFullYear()} Cafe TAB. All rights reserved. Crafted with love in Bihar Sharif.
          </p>
        </div>
      </div>
    </footer>
  );
};
