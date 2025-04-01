"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { FiDownload, FiCode, FiGithub, FiAward, FiStar } from "react-icons/fi";
import { AchievementCard } from "@/components/ui/AchievementCard";

export default function AboutPage() {
  return (
    <>
      <Section
        title="About Me"
        subtitle="Learn more about my journey in software engineering."
        className="text-gray-800 dark:text-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50 mb-6">
              My Story
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-200">
              <p>
                I'm a Junior Software Engineer with a passion for building innovative solutions across multiple platforms. My journey in software development started with web technologies and has evolved into a comprehensive skill set that spans both web and mobile development.
              </p>
              <p>
                I specialize in full-stack development using React, TypeScript, and Node.js for web applications, while also crafting native mobile experiences using Swift for iOS and Kotlin/Java for Android. This diverse technical background allows me to approach problems from different perspectives and create comprehensive solutions.
              </p>
              <p>
                I'm committed to writing clean, efficient code and implementing best practices in software development. My experience with tools like Docker and MongoDB, combined with modern development workflows through GitHub, enables me to build scalable and maintainable applications.
              </p>
              <p>
                I'm actively seeking opportunities to contribute to challenging projects and collaborate with other developers. I'm particularly excited about roles that will allow me to grow both my technical skills and professional experience in software engineering.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Button href="/resume.pdf" isExternal className="inline-flex items-center">
                <FiDownload className="mr-2" />
                Download Resume
              </Button>
              <Button href="/github" variant="outline">
                View My Work
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-primary">Your Photo Here</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Full-Stack & Mobile Development</p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section
        title="Achievements & Metrics"
        subtitle="Highlighting my technical accomplishments and contributions"
        className="py-20 bg-gray-50 dark:bg-gray-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <AchievementCard
            title="Code Quality"
            description="Maintained high code quality standards across projects with comprehensive test coverage and clean code practices."
            metric="95% Test Coverage"
            icon={FiCode}
          />
          
          <AchievementCard
            title="GitHub Contributions"
            description="Active contributor to open-source projects, focusing on mobile development tools and React components."
            metric="150+ Contributions"
            icon={FiGithub}
            link="https://github.com/xGentuso"
          />

          <AchievementCard
            title="Swift Certification"
            description="Completed Apple's Swift and iOS Development certification program, demonstrating proficiency in mobile app development."
            metric="Advanced Level"
            icon={FiAward}
          />

          <AchievementCard
            title="React Performance"
            description="Implemented performance optimizations in React applications, reducing load times and improving user experience."
            metric="40% Performance Improvement"
            icon={FiStar}
          />
        </div>

        <div className="mt-12 text-center">
          <Button 
            href="/github" 
            className="inline-flex items-center bg-primary hover:bg-primary-600 text-white shadow-lg"
          >
            <FiGithub className="mr-2" />
            View All Projects
          </Button>
        </div>
      </Section>
    </>
  );
} 