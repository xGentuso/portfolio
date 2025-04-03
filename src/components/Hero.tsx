import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
  const roles = [
    'Junior Software Engineer',
    2000,
    'Mobile App Developer',
    2000,
    'UI/UX Enthusiast',
    2000,
    'Full Stack Developer',
    2000,
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text leading-relaxed py-2"
        >
          Hi, I'm Ryan Mota
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-200 mb-6 h-[40px]"
        >
          <TypeAnimation
            sequence={roles}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8"
        >
          I craft solid and scalable software products with great user experiences. Specializing in full-stack development using React, TypeScript, and Node.js.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <a 
            href="#projects"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-200 transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </div>
  );
}; 