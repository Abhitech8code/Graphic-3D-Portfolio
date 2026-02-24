import { Github, Linkedin, Twitter, Instagram, Heart, Zap } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Zap className="w-8 h-8 text-neon-cyan" />
              <span className="font-orbitron text-2xl font-bold text-neon-cyan">
                ABHISHEK
              </span>
            </div>
            <p className="text-cyan-400/60 font-rajdhani mb-4">
              Creative Technologist & Visual Designer crafting digital experiences that inspire.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-cyan-400 hover:text-neon-cyan hover:border-neon-cyan transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h3 className="font-orbitron text-sm text-neon-orange mb-4 tracking-wider">
              NAVIGATION
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-cyan-400/60 hover:text-neon-cyan font-rajdhani transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="font-orbitron text-sm text-neon-orange mb-4 tracking-wider">
              GET IN TOUCH
            </h3>
            <div className="space-y-2 font-rajdhani">
              <p className="text-cyan-400/60">
                abhishekshukla01071997@gmail.com
              </p>
              <p className="text-cyan-400/60">
                +91 7052757579
              </p>
              <p className="text-cyan-400/60">
                Gurugram, India
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cyan-400/40 text-sm font-rajdhani text-center sm:text-left">
            &copy; {new Date().getFullYear()} Abhishek Shukla. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-cyan-400/40 text-sm font-rajdhani">
            Crafted with <Heart className="w-4 h-4 text-neon-orange fill-neon-orange" /> using React & Tailwind
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-neon-orange/5 blur-3xl" />
    </footer>
  );
}
