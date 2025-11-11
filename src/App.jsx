import React, { useState, useEffect } from 'react';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-md border-b border-gray-700 shadow-[0_0_30px_rgba(200,200,200,0.15)] py-3'
            : 'bg-gradient-to-b from-black/70 to-transparent py-5'
        }`}
      >
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-300">
            {"<Ashen />"}
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            {['Profile', 'Skills', 'Certifications', 'Education', 'Projects'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-semibold text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="btn-outline-gradient px-6 py-2 rounded-full font-bold transition-all duration-500 hover:scale-105"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4 border-t border-gray-800 bg-black/80 backdrop-blur-md">
            {['Profile', 'Skills', 'Certifications', 'Education', 'Projects'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-gray-300 transition-colors duration-300 font-semibold text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="btn-outline-gradient px-6 py-2 rounded-full font-bold transition-all duration-500 hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Profile />
        <Skills />
        <Certifications />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-gray-900 to-black text-center py-12 border-t border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-gray-400 font-extrabold">
            &copy; 2025 Malsha Ashen. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Light Gray Outline Button Style */}
      <style>{`
        .btn-outline-gradient {
          background: linear-gradient(#000, #000) padding-box,
                      linear-gradient(90deg, #d1d5db, #d1d5db) border-box;
          border-radius: 9999px;
          border: 2px solid transparent;
          color: white;
          position: relative;
          transition: all 0.4s ease;
        }
        .btn-outline-gradient:hover {
          background: linear-gradient(90deg, #d1d5db, #d1d5db);
          color: #000;
          box-shadow: 0 0 20px rgba(209, 213, 219, 0.4);
        }
      `}</style>
    </div>
  );
}

export default App;
