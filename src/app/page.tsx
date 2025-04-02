"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { FiGithub, FiLinkedin, FiMail, FiCode, FiStar, FiCode as FiCodeIcon, FiLayout, FiSmartphone, FiExternalLink, FiFolder } from "react-icons/fi";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { CodePlayground } from "@/components/ui/CodePlayground";
import { Hero } from "@/components/Hero";
import TechStack from "@/components/TechStack";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  type: string;
}

const featuredProjects: Project[] = [
  {
    title: "Petopia",
    description: "A modern virtual pet simulator built with SwiftUI for iOS. Features pet care mechanics, customization options, minigames, and an in-game economy system. Includes persistent save system and push notifications.",
    technologies: ["Swift", "SwiftUI", "iOS", "CoreData"],
    githubLink: "https://github.com/xGentuso/Petopia",
    type: "iOS Development"
  },
  {
    title: "HydrationTracker",
    description: "Native watchOS application built with SwiftUI that helps users track daily water intake. Features visual progress tracking, customizable goals, and local data storage.",
    technologies: ["Swift", "watchOS", "SwiftUI", "HealthKit"],
    githubLink: "https://github.com/xGentuso/HydrationTracker",
    type: "watchOS Development"
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and TypeScript. Features smooth scrolling, responsive design, dynamic content loading, and dark mode support.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/xGentuso/portfolio",
    type: "Web Development"
  },
  {
    title: "Weather App",
    description: "Comprehensive weather application providing real-time forecasts, location-based updates, and interactive weather maps with a clean, modern interface.",
    technologies: ["Swift", "iOS SDK", "CoreLocation", "WeatherKit"],
    githubLink: "https://github.com/xGentuso/WeatherApp",
    type: "iOS Development"
  },
  {
    title: "Grocerly",
    description: "Smart grocery shopping assistant that helps users manage shopping lists, track expenses, and find the best deals at local stores.",
    technologies: ["Swift", "UIKit", "CoreData", "MapKit"],
    githubLink: "https://github.com/xGentuso/Grocerly",
    type: "iOS Development"
  },
  {
    title: "CryptoExchange",
    description: "Real-time cryptocurrency trading platform with live price updates, portfolio tracking, and market analysis tools.",
    technologies: ["React", "Node.js", "WebSocket", "Crypto APIs"],
    githubLink: "https://github.com/xGentuso/CryptoExchange",
    type: "Full Stack"
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Random code snippet display for visual effect
  const [codeSnippets] = useState([
    'const App = () => <div>Hello World</div>;',
    'useEffect(() => { /* ... */ }, []);',
    'const [state, setState] = useState(0);',
    'export default function Component() { }',
    'tailwind.config.js',
    'npm run dev',
    'git commit -m "Feature complete"',
  ]);
  
  const [currentSnippet, setCurrentSnippet] = useState(0);

  // Simple scroll tracking for UI feedback
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Hero />
      
      {/* About Section */}
      <Section
        id="about"
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-400 dark:to-indigo-300 mb-4">
                  About Me
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-400 dark:to-indigo-300 rounded-full mb-8"></div>
              </motion.div>
              
              <div className="space-y-6 text-indigo-950/80 dark:text-indigo-100/90 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="backdrop-blur-sm bg-white/50 dark:bg-indigo-950/20 rounded-lg p-4 shadow-xl shadow-indigo-100 dark:shadow-none"
                >
                  I'm a Junior Software Engineer with a passion for building innovative solutions across multiple platforms. My journey in software development started with web technologies and has evolved into a comprehensive skill set that spans both web and mobile development.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="backdrop-blur-sm bg-white/50 dark:bg-indigo-950/20 rounded-lg p-4 shadow-xl shadow-indigo-100 dark:shadow-none"
                >
                  I specialize in full-stack development using React, TypeScript, and Node.js for web applications, while also crafting native mobile experiences using Swift for iOS and Kotlin/Java for Android. This diverse technical background allows me to approach problems from different perspectives and create comprehensive solutions.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="backdrop-blur-sm bg-white/50 dark:bg-indigo-950/20 rounded-lg p-4 shadow-xl shadow-indigo-100 dark:shadow-none"
                >
                  I'm committed to writing clean, efficient code and implementing best practices in software development. My experience with tools like Docker and MongoDB, combined with modern development workflows through GitHub, enables me to build scalable and maintainable applications.
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-indigo-100 to-white dark:from-indigo-950 dark:to-gray-900 rounded-2xl relative overflow-hidden shadow-2xl">
                <div className="absolute inset-1 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-2xl backdrop-blur-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <TechStack />

      {/* Projects Section */}
      <Section
        id="projects"
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-12">My Projects</h2>
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-6">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => window.open(project.githubLink, '_blank')}
                  >
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="p-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FiFolder className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors" />
                          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/40 transition-colors">
                            {project.type}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <FiGithub className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                          {project.liveLink && (
                            <FiExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/40 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        View Project <FiExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* GitHub Activity Section */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <FiGithub className="w-5 h-5 text-indigo-600 mr-2" />
                    <h3 className="font-bold text-gray-900">GitHub Activity</h3>
                  </div>
                  <span className="text-sm text-gray-500">Last 12 months</span>
                </div>
                <div className="p-6">
                  <img 
                    src={`https://ghchart.rshah.org/4f46e5/xGentuso`}
                    alt="GitHub Contribution Chart" 
                    className="w-full h-auto rounded" 
                  />
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/xGentuso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <FiGithub className="w-5 h-5" />
                  View More Projects
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Code Examples Section */}
      <Section
        id="code-playground"
        className="py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Code Examples
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Interactive examples showcasing my coding style and technical expertise
            </p>
          </div>
          <CodePlayground />
        </div>
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-indigo-600 mb-8">Send me a message!</h2>
            <p className="text-gray-700 text-lg mb-12">
              Got a question or proposal, or just want to say hello? Go ahead.
            </p>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Your Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={6}
                  placeholder="Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                SHOOT →
              </button>
            </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
