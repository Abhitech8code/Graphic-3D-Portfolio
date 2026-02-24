import { useState } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { Mail, Phone, Globe, Send, Terminal, Check } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'abhishekshukla01071997@gmail.com',
    href: 'mailto:abhishekshukla01071997@gmail.com',
    color: '#00ffff',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+91 7052757579',
    href: 'tel:+917052757579',
    color: '#ff6600',
  },
  {
    icon: Globe,
    label: 'PORTFOLIO',
    value: 'portfolio-abhitech.netlify.app',
    href: 'https://portfolio-abhitech.netlify.app',
    color: '#00ffff',
  },
];

export function Contact() {
  const { ref } = useInView(0.2);
  const sendBtnMagnetic = useMagneticEffect(0.2);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate transmission
    setTerminalLines(prev => [...prev, `> Initiating transmission to ${contactInfo[0].value}...`]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTerminalLines(prev => [...prev, `> Encrypting message...`]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setTerminalLines(prev => [...prev, `> Sending data packets...`]);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    setTerminalLines(prev => [...prev, `> Transmission complete!`]);
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setSubmitStatus('idle');
      setTerminalLines([]);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Terminal Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            CONNECT
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            CONTACT TERMINAL
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            Establish a secure connection. Send your transmission.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            {/* Terminal Header */}
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neon-cyan/20 bg-black/40">
                <Terminal className="w-5 h-5 text-neon-cyan" />
                <span className="font-mono text-sm text-neon-cyan">contact_terminal.exe</span>
              </div>

              <div className="p-6 space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      target={info.label === 'PORTFOLIO' ? '_blank' : undefined}
                      rel={info.label === 'PORTFOLIO' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-all duration-300 group"
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${info.color}20`,
                          boxShadow: `0 0 20px ${info.color}30`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: info.color }} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-mono text-cyan-400/50 block mb-1">
                          {info.label}
                        </span>
                        <span className="font-rajdhani text-cyan-100 group-hover:text-[${info.color}] transition-colors">
                          {info.value}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Status Panel */}
            <div className="glass-panel rounded-xl p-6">
              <h3 className="font-orbitron text-sm text-neon-cyan mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                SYSTEM STATUS
              </h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Connection:</span>
                  <span className="text-green-400">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Encryption:</span>
                  <span className="text-green-400">256-BIT SSL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Response Time:</span>
                  <span className="text-neon-cyan">&lt; 24 HOURS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Availability:</span>
                  <span className="text-neon-orange">OPEN TO WORK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neon-cyan/20 bg-black/40">
              <Send className="w-5 h-5 text-neon-orange" />
              <span className="font-mono text-sm text-neon-orange">send_transmission.exe</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-mono text-cyan-400/60 mb-2">
                  &gt; ENTER_NAME:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-neon-cyan/30 rounded-lg text-cyan-100 font-rajdhani focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                  placeholder="Your name..."
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono text-cyan-400/60 mb-2">
                  &gt; ENTER_EMAIL:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-neon-cyan/30 rounded-lg text-cyan-100 font-rajdhani focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-mono text-cyan-400/60 mb-2">
                  &gt; ENTER_MESSAGE:
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-neon-cyan/30 rounded-lg text-cyan-100 font-rajdhani focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <div
                ref={sendBtnMagnetic.ref}
                onMouseMove={sendBtnMagnetic.onMouseMove}
                onMouseLeave={sendBtnMagnetic.onMouseLeave}
                onMouseEnter={sendBtnMagnetic.onMouseEnter}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-orbitron text-sm tracking-wider relative overflow-hidden group disabled:opacity-50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-orange opacity-20 group-hover:opacity-30 transition-opacity" />
                  <span className="absolute inset-0 border border-neon-cyan rounded-lg" />
                  <span className="relative flex items-center justify-center gap-2 text-neon-cyan group-hover:text-white transition-colors">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <Check className="w-4 h-4" />
                        TRANSMISSION COMPLETE
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND TRANSMISSION
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            {/* Terminal Output */}
            {terminalLines.length > 0 && (
              <div className="px-6 pb-6">
                <div className="bg-black/60 rounded-lg p-4 font-mono text-xs space-y-1">
                  {terminalLines.map((line, index) => (
                    <p key={index} className="text-neon-cyan">
                      {line}
                    </p>
                  ))}
                  <p className="terminal-cursor text-neon-cyan" />
                </div>
              </div>
            )}

            {/* Success/Error Message */}
            {submitStatus === 'success' && (
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/20 border border-green-500/40">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-rajdhani">
                    Message transmitted successfully! I will respond within 24 hours.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
