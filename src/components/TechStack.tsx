"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  SiReact, 
  SiSwift, 
  SiKotlin,
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiMongodb, 
  SiDocker, 
  SiGithub,
  SiNextdotjs,
  SiPhp 
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FiRotateCw } from "react-icons/fi";

const technologies = [
  {
    name: "React",
    icon: SiReact,
    color: "text-[#61DAFB]",
    description: "Frontend Development",
    level: "Advanced",
    details: [
      "Component Architecture",
      "State Management (Redux, Context)",
      "React Hooks",
      "Performance Optimization",
      "Custom Hook Development"
    ]
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-[#000000] dark:text-white",
    description: "React Framework",
    level: "Advanced",
    details: [
      "Server-Side Rendering",
      "Static Site Generation",
      "API Routes",
      "Image Optimization",
      "Dynamic Routing"
    ]
  },
  {
    name: "Swift",
    icon: SiSwift,
    color: "text-[#F05138]",
    description: "iOS Development",
    level: "Advanced",
    details: [
      "SwiftUI & UIKit",
      "Core Data",
      "Push Notifications",
      "App Store Deployment",
      "iOS Design Patterns"
    ]
  },
  {
    name: "Kotlin",
    icon: SiKotlin,
    color: "text-[#7F52FF]",
    description: "Android Development",
    level: "Intermediate",
    details: [
      "Android SDK",
      "Jetpack Compose",
      "Material Design",
      "Room Database",
      "Kotlin Coroutines"
    ]
  },
  {
    name: "Java",
    icon: DiJava,
    color: "text-[#007396]",
    description: "Backend Development",
    level: "Advanced",
    details: [
      "Spring Framework",
      "RESTful APIs",
      "Microservices",
      "JUnit Testing",
      "Maven/Gradle"
    ]
  },
  {
    name: "PHP",
    icon: SiPhp,
    color: "text-[#777BB4]",
    description: "Server-Side Development",
    level: "Intermediate",
    details: [
      "Laravel Framework",
      "MVC Architecture",
      "Database Integration",
      "API Development",
      "Composer Package Manager"
    ]
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-[#F7DF1E]",
    description: "Web Development",
    level: "Advanced",
    details: [
      "ES6+ Features",
      "Async Programming",
      "DOM Manipulation",
      "Browser APIs",
      "Web Performance"
    ]
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-[#3178C6]",
    description: "Type-Safe Development",
    level: "Advanced",
    details: [
      "Type Systems",
      "Interfaces & Generics",
      "Decorators",
      "Module System",
      "Configuration"
    ]
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-[#339933]",
    description: "Server-Side Development",
    level: "Intermediate",
    details: [
      "Express.js",
      "REST APIs",
      "Authentication",
      "Database Integration",
      "Error Handling"
    ]
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-[#47A248]",
    description: "Database Management",
    level: "Intermediate",
    details: [
      "Schema Design",
      "CRUD Operations",
      "Aggregation Pipeline",
      "Indexing",
      "Data Modeling"
    ]
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "text-[#2496ED]",
    description: "Containerization",
    level: "Intermediate",
    details: [
      "Container Management",
      "Docker Compose",
      "Image Building",
      "Network Configuration",
      "Volume Management"
    ]
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "text-white",
    description: "Version Control",
    level: "Advanced",
    details: [
      "Git Flow",
      "CI/CD Pipelines",
      "Pull Requests",
      "Code Reviews",
      "GitHub Actions"
    ]
  }
];

interface TechStackCardProps {
  tech: typeof technologies[0];
}

function TechStackCard({ tech }: TechStackCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = tech.icon;

  return (
    <div className="relative h-[280px] w-full perspective-1000">
      <motion.div
        className="w-full h-full relative cursor-pointer preserve-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="group h-full flex flex-col items-center justify-center p-6 rounded-xl bg-[#1E2330] border border-gray-700/50 hover:border-gray-600/50 transition-colors relative overflow-hidden">
            {/* Flip indicator - visible on mobile, hover on desktop */}
            <div className="absolute top-3 right-3 flex items-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <FiRotateCw className="w-4 h-4 text-gray-400 animate-pulse md:animate-none md:group-hover:animate-pulse" />
              <span className="text-xs text-gray-400 ml-1.5">Tap to view skills</span>
            </div>
            
            <Icon className={`w-12 h-12 ${tech.color} mb-4`} />
            <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{tech.description}</p>
            <span className={`text-xs px-3 py-1 rounded-full ${
              tech.level === 'Advanced' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {tech.level}
            </span>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="h-full flex flex-col p-6 rounded-xl bg-[#1E2330] border border-gray-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">{tech.name} Skills</h4>
            <ul className="space-y-2 flex-1">
              {tech.details.map((detail, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                  {detail}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 text-center mt-4">Tap to flip back</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-20 bg-[#0B1120] bg-[radial-gradient(#1D2B44_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Technologies I Work With
          </h2>
          <p className="text-lg text-gray-400">
            My tech stack includes modern and industry-standard technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TechStackCard tech={tech} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 