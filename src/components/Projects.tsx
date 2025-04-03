"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  type: string;
  image: string;
}

const featuredProjects: Project[] = [
  {
    title: "Collex",
    description: "An iOS marketplace app for collectors to buy, sell, and authenticate collectible items. Features real-time price tracking, secure in-app messaging, and integrated payment processing.",
    technologies: ["Swift", "UIKit", "Core Data", "Firebase", "Stripe SDK"],
    githubLink: "https://github.com/xGentuso/collex",
    type: "iOS Development",
    image: "/collex.png"
  },
  {
    title: "Farmrly",
    description: "An iOS application connecting local farmers with consumers, featuring real-time inventory updates, push notifications for order status, and integrated maps for delivery tracking.",
    technologies: ["Swift", "SwiftUI", "MapKit", "Core Location", "Firebase"],
    githubLink: "https://github.com/xGentuso/farmrly",
    type: "iOS Development",
    image: "/farmrly.png"
  },
  {
    title: "CryptoX",
    description: "A comprehensive iOS cryptocurrency tracking app with real-time market data, portfolio management, price alerts, and biometric authentication for secure trading.",
    technologies: ["Swift", "Combine", "Core Data", "CryptoKit", "WebSocket"],
    githubLink: "https://github.com/xGentuso/cryptox",
    type: "iOS Development",
    image: "/cryptox.png"
  },
  {
    title: "Petopia",
    description: "A virtual pet care and management application built with SwiftUI. Features interactive pet care mechanics, customization options, and an engaging reward system.",
    technologies: ["Swift", "SwiftUI", "Core Data", "Push Notifications"],
    githubLink: "https://github.com/xGentuso/petopia",
    type: "iOS Development",
    image: "/petopia.png"
  },
  {
    title: "HydrationTracker",
    description: "A watchOS application that helps users track their daily water intake with intuitive controls and health insights. Integrates with HealthKit for comprehensive health monitoring.",
    technologies: ["Swift", "watchOS", "HealthKit", "SwiftUI"],
    githubLink: "https://github.com/xGentuso/hydrationtracker",
    type: "watchOS Development",
    image: "/hydration.png"
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website showcasing my projects and skills. Built with Next.js and TypeScript, featuring smooth animations, responsive design, and dark mode support.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/xGentuso/portfolio",
    liveLink: "https://ryanmota.dev",
    type: "Full Stack",
    image: "/portfolio.png"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400">
            Here are some of my recent works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50"
            >
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {project.type}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-gray-700/50 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-4">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiGithub className="w-5 h-5" />
                  </Link>
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="https://github.com/xGentuso?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-300"
          >
            <span>Browse More Projects</span>
            <FiExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">
              GitHub Contributions
            </h3>
            <p className="text-gray-400">
              A snapshot of my coding activity
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50">
            <div className="p-4 md:p-6">
              <div className="w-full overflow-hidden rounded-lg bg-[#0D1117] flex items-center justify-center py-4">
                <div className="w-[900px] max-w-full">
                  <img
                    src={`https://ghchart.rshah.org/409ba5/xGentuso`}
                    alt="GitHub Contribution Graph"
                    className="w-full h-auto"
                    style={{
                      filter: 'contrast(95%) brightness(95%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 