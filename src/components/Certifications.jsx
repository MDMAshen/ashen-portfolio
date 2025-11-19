import React, { useMemo, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Background from "./Background"; //  import shared background

import fullstack from "../assets/Full_stack.png";
import prompt from "../assets/Prompt_engeneering.png";
import gen from "../assets/Gen_ai.png";
import oracle from "../assets/oracle.png";
import udemy from "../assets/udemy.png";

export default function Certifications({ items }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: false, amount: 0.2 });

  const certifications = useMemo(
    () =>
      items ?? [
        {
          title: "Getting Started with Full Stack Java Development",
          org: "Simplilearn",
          year: "Issued Nov 2025",
          credentialId: "1234",
          image: fullstack,
          link: "https://simpli-web.app.link/e/7iynNTjgqYb",
        },
        {
          title: "Prompt Engineering Application",
          org: "Simplilearn",
          year: "Issued Nov 2025",
          image: prompt,
          link: "https://simpli-web.app.link/e/4yeZgHqcbYb",
        },
        {
          title: "Generative AI Software Development",
          org: "Simplilearn",
          year: "Issued Nov 2025",
          image: gen,
          link: "https://simpli-web.app.link/e/G9QTqNt25Xb",
        },
        {
          title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
          org: "Oracle",
          year: "Issued Jul 2025",
          image: oracle,
          link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0B123C293B8146D9C286919F88001FA9A954BDCE5A83A16642A64A493770F15C",
        },
        {
          title: "The Complete Full-Stack Web Development Bootcamp (Ongoing)",
          org: "Udemy",
          year: "Oct 2025 - Present",
          image: udemy,
        },
      ],
    [items]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden py-24 px-4 sm:px-6"
    >
      {/*  Shared Background */}
      <Background />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center transition-all duration-600 ease-out ${
            isTitleInView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90"
          }`}
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gray-400 from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent pb-3">
            Certifications
          </h2>
          <div className="h-1 w-24 bg-gray-400 from-sky-400 to-emerald-400 mx-auto" />
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {certifications.slice(0, 3).map((cert, idx) => (
            <CertCard cert={cert} idx={idx} key={cert.title} />
          ))}
          <div className="xl:col-span-3 flex justify-center gap-8">
            {certifications.slice(3).map((cert, idx) => (
              <CertCard cert={cert} idx={idx + 3} key={cert.title} />
            ))}
          </div>
        </div>
      </div>

      {/*  Added glowing gradient border + shine effect */}
      <style>{`
        .card-glow {
          background: linear-gradient(#0b0b0b, #0b0b0b) padding-box,
                      linear-gradient(90deg, rgba(56,189,248,0.75), rgba(16,185,129,0.75)) border-box;
          border: 1.5px solid transparent;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        /*  Shine animation */
        .img-wrap {
          position: relative;
          overflow: hidden;
        }

        .img-wrap img {
          position: relative;
          z-index: 10;
        }

        .img-wrap::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: all 0.7s ease;
        }

        .img-wrap:hover::after {
          left: 125%;
          transition: all 0.7s ease;
        }
      `}</style>
    </section>
  );
}

function CertCard({ cert, idx }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.85, delay: idx * 0.1 }}
      className="card-glow p-6 sm:p-8 backdrop-blur-md"
    >
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <div className="img-wrap h-20 w-20 sm:h-24 sm:w-24">
            <img
              src={cert.image}
              alt={`${cert.org} badge`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">{cert.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{cert.org}</p>
          <p className="text-sm text-gray-500 mt-1">{cert.year}</p>
          {cert.link && (
            <div className="mt-3">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky-400 hover:text-emerald-400 transition"
              >
                View credential <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
