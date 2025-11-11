import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Ashen from '../assets/Ashen.png';
import Malshaashencv from '../assets/MALSHA_ASHEN.pdf';
import Background from './Background';

function Profile() {
  const contentRef = useRef(null);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isInView, setIsInView] = useState(false);

  const wordsToAnimate = ['Full-Stack Developer | UI/UX Designer'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setIsInView(entry.isIntersecting)),
      { threshold: 0.2 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => contentRef.current && observer.unobserve(contentRef.current);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % wordsToAnimate.length;
      const fullText = wordsToAnimate[i];
      const speed = isDeleting ? 80 : 100;

      setTypingSpeed(speed);
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 1000);
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="profile"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6"
    >
      <Background />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center gap-6 max-w-3xl mx-auto"
      >
        <img
          src={Ashen}
          alt="Malsha Ashen"
          className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-8 border-white/20 object-cover shadow-2xl mx-auto"
        />

        <motion.h1 className="text-5xl sm:text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Malsha Ashen
        </motion.h1>

        {/* Underline changed to light gray */}
        <motion.div className="h-1 w-24 bg-gray-400 mx-auto" />

        {/* Typing text color changed to light gray */}
        <motion.h2 className="text-2xl sm:text-3xl font-bold mt-2" style={{ minHeight: '40px' }}>
          <span className="text-gray-300">{text}</span>
          <span className="blinking-cursor" />
        </motion.h2>

        <p className="text-lg sm:text-xl text-gray-300">
          Crafting modern, scalable web and mobile applications with a creative touch.
        </p>

        <p className="text-base sm:text-lg text-gray-500 italic">
          An ICT undergraduate at the University of Colombo, passionate about full-stack development and UI/UX design.
        </p>

        <div className="flex justify-center items-center gap-4 pt-8 flex-wrap">
          {[ 
            { label: 'GitHub', href: 'https://github.com/MDMAshen', external: true },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/malsha-ashen-755125217', external: true },
            { label: 'Download CV', href: Malshaashencv, download: 'MALSHA_ASHEN.pdf' },
            { label: 'Email', href: 'mailto:malshaashen20@gmail.com' },
          ].map(({ label, href, external, download }) => (
            <a
              key={label}
              href={href}
              className="btn-outline-gradient relative overflow-hidden rounded-full px-8 py-3 font-semibold text-white text-base shadow-md border-2 border-transparent bg-clip-padding transition-all duration-500"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(download ? { download } : {})}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          margin-left: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: blink 1s step-start infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .btn-outline-gradient {
          background: linear-gradient(#000, #000) padding-box,
                      linear-gradient(90deg, #d1d5db, #d1d5db) border-box;
          border-radius: 9999px;
          border: 2px solid transparent;
          transition: all 0.4s ease;
        }
        .btn-outline-gradient:hover {
          background: linear-gradient(90deg, #d1d5db, #d1d5db);
          color: #000;
          box-shadow: 0 0 20px rgba(209,213,219,0.4);
        }
      `}</style>
    </section>
  );
}

export default Profile;
