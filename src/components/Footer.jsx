"use client";
import Link from "next/link";
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiArrowUp,
  FiGithub
} from "react-icons/fi";
import Button from "./ui/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-indigo-400 mb-4 inline-block">
              Next Gadget
            </Link>
            <p className="text-gray-400 mb-6">
              Discover the next generation of innovative gadgets and technology that transforms your daily life.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/fuad_hasan05"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/fuad05/"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/fuadhasan05"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Facebook"
              >
                <FiGithub className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=audio" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Audio Devices
                </Link>
              </li>
              <li>
                <Link href="/products?category=wearables" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Wearables
                </Link>
              </li>
              <li>
                <Link href="/products?category=computers" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Computers & Laptops
                </Link>
              </li>
              <li>
                <Link href="/products?category=smart-home" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Smart Home
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FiMail className="h-5 w-5 text-indigo-400 mr-3" />
                <span className="text-gray-400">support@nextgadget.com</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="h-5 w-5 text-indigo-400 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <FiMapPin className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-400">
                  123 Tech Street<br />
                  San Francisco, CA 94103
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Next Gadget. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 z-50"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}