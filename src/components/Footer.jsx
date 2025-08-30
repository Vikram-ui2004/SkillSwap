import React from 'react';
import { BookOpen, Twitter, Linkedin, Facebook, Youtube } from 'lucide-react';

// Reusable component for footer links to keep the code clean
const FooterLink = ({ href, children }) => (
  <a href={href} className="text-[#D4BEE4] hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-purple-600 text-white pt-16 pb-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content with multiple columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Get to Know Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Get to Know Us</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink href="#">About SkillSwap</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Press</FooterLink>
            </div>
          </div>

          {/* Column 2: Learn with Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Learn with Us</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink href="#">Browse All Skills</FooterLink>
              <FooterLink href="#">Become a Teacher</FooterLink>
              <FooterLink href="#">SkillSwap for Business</FooterLink>
              <FooterLink href="#">Partnerships</FooterLink>
            </div>
          </div>

          {/* Column 3: Let Us Help You */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Let Us Help You</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink href="#">Your Account</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Report an Issue</FooterLink>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Connect with Us</h3>
            <div className="flex space-x-4">
              <FooterLink href="#"><Twitter size={24} /></FooterLink>
              <FooterLink href="#"><Linkedin size={24} /></FooterLink>
              <FooterLink href="#"><Facebook size={24} /></FooterLink>
              <FooterLink href="#"><Youtube size={24} /></FooterLink>
            </div>
          </div>
        </div>

        {/* Divider and bottom section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen className="w-8 h-8 text-[#D4BEE4]" />
            <span className="text-2xl font-bold text-white">SkillSwap</span>
          </div>
          <div className="text-sm text-[#D4BEE4]">
            <p>&copy; {new Date().getFullYear()} SkillSwap, Inc. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <FooterLink href="#">Terms of Service</FooterLink>
              <span>&middot;</span>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
