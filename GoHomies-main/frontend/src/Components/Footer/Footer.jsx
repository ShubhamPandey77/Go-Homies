import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-[#f8f9fa] border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 pb-12 border-b border-gray-200">
          
          {/* Left: Logo + Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="40"
                height="40"
                viewBox="0 0 1024 1024"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                  fill="#6B8E23"
                  stroke="none"
                >
                  <path d="M4865 10234 c-343 -31 -644 -139 -916 -341 -405 -301 -673 -735 -735 -1215 -18 -140 -18 -4580 0 -4720 62 -480 330 -914 735 -1215 272 -202 573 -310 916 -341 l127 -11 0 -507 c0 -492 1 -508 20 -528 26 -27 62 -27 88 0 19 20 20 36 20 528 l0 507 127 11 c343 31 644 139 916 341 405 301 673 735 735 1215 18 140 18 4580 0 4720 -62 480 -330 914 -735 1215 -272 202 -573 310 -916 341 l-127 11 0 507 c0 492 -1 508 -20 528 -26 27 -62 27 -88 0 -19 -20 -20 -36 -20 -528 l0 -507 -127 -11z m246 -769 c289 -26 557 -132 764 -306 246 -204 399 -491 432 -800 11 -97 11 -4344 0 -4441 -33 -309 -186 -596 -432 -800 -207 -174 -475 -280 -764 -306 l-106 -10 0 2888 0 2888 106 -10z"/>
                </g>
              </svg>
              <span className="text-2xl font-bold text-gray-900">GoHomies</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Connect with fellow travelers, plan group trips, and create unforgettable memories. GoHomies is your community for adventure-seekers and travel enthusiasts.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#6B8E23] rounded-full flex items-center justify-center text-white hover:bg-[#5a7a1c] transition" title="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#6B8E23] rounded-full flex items-center justify-center text-white hover:bg-[#5a7a1c] transition" title="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#6B8E23] rounded-full flex items-center justify-center text-white hover:bg-[#5a7a1c] transition" title="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#6B8E23] rounded-full flex items-center justify-center text-white hover:bg-[#5a7a1c] transition" title="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Right: Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get the latest travel tips, featured destinations, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6B8E23] focus:ring-1 focus:ring-[#6B8E23] text-sm"
                required
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-600 text-sm mt-2">✓ Thanks for subscribing!</p>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Explore */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Home</a></li>
              <li><a href="/posts" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Travel Posts</a></li>
              <li><a href="/vlogs" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Travel Vlogs</a></li>
              <li><a href="/booking" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">My Bookings</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about_us" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">About Us</a></li>
              <li><a href="/contact_us" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Careers</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Safety Tips</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Travel Guides</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">FAQs</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-[#6B8E23] transition">Disclaimer</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-200 pt-8">
          <p>© 2024 GoHomies. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Made with ❤️ by Shubham</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
