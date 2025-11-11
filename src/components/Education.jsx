import React, { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import Background from "./Background"; //  shared background
import uocLogo from "../assets/uoc.png";
import pcc from "../assets/PCC.png";

export default function Education() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.2 });

  const educationData = useMemo(
    () => [
      {
        institution: "University of Colombo",
        degree:
          "Bachelor of Information and Communication Technology (BICT Honours)",
        period: "2023 - Present",
        logo: uocLogo,
      },
      {
        institution: "Piliyandala Central College",
        degree: "A/L Technology Stream",
        period: "2018 - 2020",
        logo: pcc,
      },
    ],
    []
  );

  return (
    <section
      id="education"
      className="relative py-24 min-h-screen bg-black text-white overflow-hidden"
    >
      {/*  Shared Background */}
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center transition-all duration-600 ease-out ${
            isTitleInView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90"
          }`}
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold bg-gray-400 from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent pb-3">
            Academic Journey
          </h2>
          <div className="h-1 w-24 bg-gray-400 from-sky-400 to-emerald-400 mx-auto mt-3" />
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="edu-card-glow p-8 w-80 sm:w-96 rounded-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 backdrop-blur-md"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="logo-container w-16 h-16 shrink-0 rounded-md bg-white/5 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    className="w-full h-full object-contain relative z-10 pointer-events-none"
                  />
                  <span className="shine"></span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-gray-400 text-sm">{edu.period}</p>
                </div>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                {edu.degree}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  Added glowing gradient border style */}
      <style>{`
        .edu-card-glow {
          background: linear-gradient(#0b0b0b, #0b0b0b) padding-box,
                      linear-gradient(90deg, rgba(56,189,248,0.75), rgba(16,185,129,0.75)) border-box;
          border: 1.5px solid transparent;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        /*  Shine effect on hover */
        .logo-container {
          position: relative;
          overflow: hidden;
          z-index: 0;
        }

        .shine {
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
          z-index: 20; /*  Ensures shine is always above image */
          pointer-events: none;
        }

        .logo-container:hover .shine {
          left: 125%;
          transition: all 0.7s ease;
        }
      `}</style>
    </section>
  );
}
