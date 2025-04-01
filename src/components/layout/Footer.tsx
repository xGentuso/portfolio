"use client";

import { FiGithub, FiMail, FiLinkedin } from "react-icons/fi";

const navigation = {
  sections: [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ],
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
      href: "mailto:ryan.mota@triosstudent.com",
      icon: FiMail,
    },
  ],
  technologies: [
    "React",
    "Next.js",
    "Swift",
    "Kotlin",
    "Java",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Docker",
  ],
};

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-indigo-50">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav className="mb-8 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.sections.map((item) => (
            <div key={item.name} className="pb-6">
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            </div>
          ))}
        </nav>
        
        <div className="mt-8 border-t border-gray-900/10 pt-8">
          <h3 className="text-sm font-semibold leading-6 text-gray-900 mb-4 text-center">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {navigation.technologies.map((tech) => (
              <span key={tech} className="hover:text-indigo-600 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        
        <p className="mt-8 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Ryan Mota. Junior Software Engineer.
        </p>
      </div>
    </footer>
  );
} 