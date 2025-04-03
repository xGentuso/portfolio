"use client";

import { FiGithub, FiMail, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

const navigation = {
  social: [
    {
      name: "GitHub",
      href: "https://github.com/xGentuso",
      icon: FiGithub,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/ryancodes/",
      icon: FiLinkedin,
    },
    {
      name: "Email",
      href: "mailto:ryancodes00@gmail.com",
      icon: FiMail,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-indigo-50/50 to-indigo-100/50 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-indigo-400 rounded-full blur-3xl" />
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-400 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            {navigation.social.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-24 bg-gradient-to-r from-transparent via-gray-400/50 dark:via-gray-600/50 to-transparent" />
          
          {/* Copyright */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-600 dark:text-gray-400"
          >
            &copy; {new Date().getFullYear()} Ryan Mota
            <span className="block sm:inline sm:ml-1">• Junior Software Engineer</span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
} 