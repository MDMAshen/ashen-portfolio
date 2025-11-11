import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiMysql, SiMongodb, SiGit, SiGithub,
  SiBootstrap, SiPython, SiC, SiAndroidstudio, SiAdobeillustrator,
  SiTailwindcss, SiFigma
} from 'react-icons/si';
import Background from './Background';

export default function Skills() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2, margin: '-10% 0px -10% 0px' });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.2 });

  const skills = [
    { Icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
    { Icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { Icon: SiReact, name: 'React', color: '#61DAFB' },
    { Icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { Icon: SiExpress, name: 'Express.js', color: '#888888' },
    { Icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { Icon: SiMongodb, name: 'MongoDB', color: '#4DB33D' },
    { Icon: SiGit, name: 'Git', color: '#F1502F' },
    { Icon: SiGithub, name: 'GitHub', color: '#ffffff' },
    { Icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
    { Icon: SiPython, name: 'Python', color: '#3776AB' },
    { Icon: SiC, name: 'C', color: '#A8B9CC' },
    { Icon: SiAndroidstudio, name: 'Android Studio', color: '#3DDC84' },
    { Icon: SiAdobeillustrator, name: 'Adobe Illustrator', color: '#FF9A00' },
    { Icon: SiTailwindcss, name: 'TailwindCSS', color: '#38BDF8' },
    { Icon: SiFigma, name: 'Figma', color: '#A259FF' },
  ];

  return (
    <section
      id="skills"
      className="relative py-24 text-white overflow-hidden flex flex-col items-center justify-center"
    >
      <Background />

      <div
        ref={titleRef}
        className={`relative z-10 text-center mb-12 transition-all duration-600 ease-out ${
          isTitleInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
        }`}
      >
        <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gray-400 from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent pb-3">
          Skills & Expertise
        </h2>
        <div className="h-1 w-84 bg-gray-400 from-sky-400 to-emerald-400 mx-auto mt-4" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-6"
      >
        {skills.map(({ Icon, name, color }, idx) => (
          <motion.div
            key={name}
            className="skill-card group relative rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-white/10 bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.85,
              delay: idx * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-sky-400/30 to-emerald-400/30 blur-xl"></div>
            <div
              className="text-5xl mb-4 z-10 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6"
              style={{ color }}
            >
              <Icon />
            </div>
            <p className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-500 z-10">
              {name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
