import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import Background from './Background'; // 👈 import the shared background component

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: false, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    sending: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: false, sending: true });

    try {
      const response = await fetch('https://formsubmit.co/malshaashen20@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setFormStatus({ submitted: true, error: false, sending: false });
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setFormStatus({ submitted: false, error: false, sending: false });
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({ submitted: false, error: true, sending: false });
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, sending: false });
      }, 1000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'malshaashen20@gmail.com',
      href: 'mailto:malshaashen20@gmail.com',
      color: 'from-sky-400 to-cyan-400',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+94 76 400 0184',
      href: 'tel:+94764000184',
      color: 'from-emerald-400 to-teal-400',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Colombo, Sri Lanka',
      href: null,
      color: 'from-violet-400 to-purple-400',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/MDMAshen',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/malsha-ashen-755125217',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden py-24 px-4 sm:px-6"
    >
      {/* 🌌 Animated Background Component */}
      <Background />

      {/* Optional soft gradient overlay for glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-80"
        style={{
          background:
            'radial-gradient(1200px 600px at 15% 20%, rgba(99, 179, 237, 0.14), transparent 60%), radial-gradient(900px 500px at 85% 80%, rgba(45, 212, 191, 0.12), transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-600 ease-out ${
            isTitleInView
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-90'
          }`}
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gray-400 from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent pb-3">
            Let’s Connect
          </h2>
          <div className="h-1 w-24 bg-gray-400 from-sky-400 to-emerald-400 mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Whether it’s a collaboration or a quick chat — I’m just a message away.
          </p>
        </div>
        
        {/* Contact Content */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side */}
          <div className="space-y-8">
            {contactInfo.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={
                  isContentInView
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 0, x: -20, scale: 0.95 }
                }
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="contact-info-card group relative flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div
                  className={`relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="relative flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white font-medium hover:text-sky-400 transition-colors duration-300 text-base"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-base">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <h4 className="text-lg font-semibold mb-4 text-gray-300">
                Connect on Social Media
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isContentInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    style={{ transitionDelay: `${0.7 + idx * 0.1}s` }}
                  >
                    <social.icon className="w-6 h-6 text-gray-400" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={
              isContentInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 30, scale: 0.95 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="contact-form-card rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Quick Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-400"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-400"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-400 resize-none"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus.submitted || formStatus.sending}
                className="w-full py-4 rounded-full font-semibold bg-gray-400 from-sky-400 to-emerald-400 text-black shadow-md hover:shadow-xl transition-all duration-300"
              >
                {formStatus.sending
                  ? 'Sending...'
                  : formStatus.submitted
                  ? 'Message Sent!'
                  : 'Send Message'}
                <Send className="inline-block w-5 h-5 ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
