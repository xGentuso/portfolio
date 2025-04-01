"use client";

import { Section } from "@/components/ui/Section";
import { SkillCard } from "@/components/ui/SkillCard";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaMobileAlt,
  FaGitAlt,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";

const skills = [
  {
    title: "React",
    description: "Building modern, responsive web applications with React and Next.js. Experienced with hooks, context, and state management.",
    icon: FaReact,
    level: 5,
  },
  {
    title: "HTML5",
    description: "Writing semantic, accessible HTML markup following best practices and SEO guidelines.",
    icon: FaHtml5,
    level: 5,
  },
  {
    title: "CSS3",
    description: "Creating beautiful, responsive layouts using modern CSS features, Tailwind CSS, and CSS-in-JS solutions.",
    icon: FaCss3Alt,
    level: 5,
  },
  {
    title: "JavaScript",
    description: "Developing interactive web applications with modern JavaScript features, ES6+, and TypeScript.",
    icon: FaJs,
    level: 4,
  },
  {
    title: "Mobile Web",
    description: "Building mobile-first, responsive web applications with a focus on performance and user experience.",
    icon: FaMobileAlt,
    level: 4,
  },
  {
    title: "Git",
    description: "Version control and collaboration using Git and GitHub, following best practices for branching and merging.",
    icon: FaGitAlt,
    level: 4,
  },
  {
    title: "Node.js",
    description: "Developing server-side applications and APIs using Node.js and Express.",
    icon: FaNodeJs,
    level: 3,
  },
  {
    title: "Databases",
    description: "Working with various databases including MongoDB, PostgreSQL, and Firebase.",
    icon: FaDatabase,
    level: 3,
  },
];

export default function SkillsPage() {
  return (
    <Section
      title="My Skills"
      subtitle="Technical skills and technologies I work with."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </Section>
  );
} 