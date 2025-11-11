import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import Background from './Background'; //  Import Background component
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

function Projects() {
  const sectionRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  const projects = [
    {
      title: 'Inventory Management System',
      description:
        'Developed a responsive web application for managing inventory using React, Node.js, Express, and MongoDB. Designed search and navigation features for quick access to item details and locations, improving overall usability and efficiency.',
      image: project1,
      link: 'https://github.com/MalithDN/Inventory-Management-System-For-University-Faculty.git',
    },
    {
      title: 'FOT TIMES',
      description:
        'Built a mobile app with user authentication, profile management, and categorized news updates. Designed modern UIs in Figma based on Material Design for an engaging user experience.',
      image: project2,
      link: 'https://github.com/MDMAshen/FOT-Times-App.git',
    },
    {
      title: 'Library Management System',
      description:
        'Built user management features including edit, delete, and user listing functionality with a responsive interface and efficient data handling.',
      image: project3,
      link: 'https://github.com/ManugaK/Web-App-Project',
    },
  ];

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTitleVisible(true);
        } else {
          setIsTitleVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          } else {
            setVisibleIndexes((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    const cards = document.querySelectorAll('.project-card');

    if (section) titleObserver.observe(section.querySelector('#projects-title'));
    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-24 min-h-screen bg-black text-white overflow-hidden"
    >
      {/*  Reusable Background Component */}
      <Background />

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-600 ease-out ${
            isTitleVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-90'
          }`}
        >
          <h2
            id="projects-title"
            className="text-5xl sm:text-6xl font-extrabold pb-3 tracking-tight bg-gray-400 from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Projects
          </h2>
          <div className="h-1 w-24 bg-gray-400 from-sky-400 to-emerald-400 mx-auto mt-3" />
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Turning ideas into interactive and visually engaging digital
            experiences.
          </p>
        </div>

        {/* Project Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {projects.map((project, index) => {
            const isVisible = visibleIndexes.includes(index);
            return (
              <motion.div
                key={index}
                data-index={index}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.98 }
                }
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="project-card relative mb-12 flex flex-col p-6 bg-white/10 backdrop-blur-md rounded-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold text-white mt-6 text-left">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mt-2 text-left flex-grow">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-left group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Source Code</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gradient border/aura effect */}
      <style>{`
        .project-card {
          background:
            linear-gradient(#0b0b0b, #0b0b0b) padding-box,
            linear-gradient(90deg, rgba(56,189,248,0.75), rgba(16,185,129,0.75)) border-box;
          border: 1.5px solid transparent;
          border-radius: 16px;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            box-shadow .5s ease,
            border-color .45s ease,
            filter .5s ease;
        }
        .project-card:hover {
          box-shadow:
            0 20px 65px rgba(56,189,248,0.28),
            0 12px 38px rgba(16,185,129,0.22),
            0 5px 10px rgba(0,0,0,0.4);
          filter: brightness(1.08);
        }
      `}</style>
    </section>
  );
}

export default Projects;
