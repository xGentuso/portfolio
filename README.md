# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases my work as a mobile web developer and provides a platform for potential employers to learn more about my skills and experience.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- 🌙 Dark mode support
- ⚡ Fast performance with Next.js
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO optimized
- 📝 Easy to customize

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Personal Information

1. Update your personal information in the following files:
   - `src/app/page.tsx` - Hero section and featured projects
   - `src/app/about/page.tsx` - About section
   - `src/app/contact/page.tsx` - Contact information
   - `src/components/layout/Footer.tsx` - Footer links

2. Add your project images to the `public/projects` directory and update the image paths in:
   - `src/app/page.tsx`
   - `src/app/projects/page.tsx`

3. Update your skills in `src/app/skills/page.tsx`

### Styling

1. The primary color can be customized in `tailwind.config.ts`
2. Global styles can be modified in `src/app/globals.css`

## Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy!

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Icons](https://react-icons.github.io/react-icons/) - Icons

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
