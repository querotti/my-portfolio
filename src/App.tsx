import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code2,
  BrainCircuit,
  Layout,
  ExternalLink,
  Cpu,
  Moon,
  Sun
} from 'lucide-react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg bg-emerald-100/50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-emerald-200/50 dark:border-zinc-800 hover:bg-emerald-200/50 dark:hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

function GlowCard({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-2xl bg-emerald-50/50 dark:bg-zinc-900/50 border border-emerald-200/50 dark:border-zinc-800/50 overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 rounded-2xl"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.8), transparent 40%)`,
          zIndex: 1,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    title: "AI-Powered Developer Portfolio",
    description: "A modern, responsive portfolio website built to showcase my skills and experience. Developed using React, Tailwind CSS, and Framer Motion, featuring a dark 'technical dashboard' aesthetic with smooth scroll animations.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    icon: <Code2 className="w-6 h-6" />,
    link: "https://github.com/querotti"
  }
];

const SKILLS = [
  { category: "Languages", items: ["C++", "HTML5", "JavaScript", "Python", "TypeScript"] },
  { category: "Frameworks", items: [".Net", "Express.js", "FastAPI", "NodeJS", "React"] },
  { category: "SaaS", items: ["Cloudflare", "Firebase", "Vercel"] },
  { category: "Databases", items: ["MySQL"] },
  { category: "Design", items: ["Adobe After Effects", "Adobe Photoshop"] }
];

const EXPERIENCE = [
  {
    role: "Technical Support & Administration",
    company: "Prefeitura de Guaíba (Guaíba City Hall)",
    period: "May 2024 - Oct 2024",
    description: "In-person role responsible for technical support, logistics management, manual labor, customer service, Microsoft Office, machine learning applications, administration, and public service."
  },
  {
    role: "Copywriter",
    company: "EC Guaíba Contabilidade",
    period: "Jan 2024 - Mar 2024",
    description: "Remote role focused on copywriting and online communication for an accounting company, demonstrating fast learning and adaptability."
  },
  {
    role: "Technical Support & Systems Administration",
    company: "Querotti Seguros",
    period: "Jun 2022 - Nov 2023",
    description: "Half-time role at an insurance brokerage and vehicle rental company. Responsibilities included technical support, financial analysis, systems administration, Microsoft Office, machine learning, and general administration."
  }
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-emerald-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-emerald-200/50 dark:border-zinc-800/50 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tighter flex items-center gap-2 text-zinc-900 dark:text-white">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white dark:text-zinc-950">
            <Terminal className="w-5 h-5" />
          </div>
          <span>Murilo.dev</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">About</a>
          <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a href="#contact" className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="pt-20 pb-16 md:pt-32 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 dark:bg-zinc-900 border border-emerald-200/50 dark:border-zinc-800 text-sm font-mono text-emerald-800 dark:text-zinc-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available for Summer 2026 Internships
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-white">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Murilo</span>.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Computer Science student building intelligent systems.
          Specializing in <span className="text-zinc-900 dark:text-zinc-200 font-medium">AI Engineering</span> and <span className="text-zinc-900 dark:text-zinc-200 font-medium">Full Stack Development</span>.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#contact" className="px-6 py-3 rounded-lg bg-emerald-500 text-white dark:text-zinc-950 font-medium hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
          <a href="https://github.com/querotti" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-emerald-100/50 dark:bg-zinc-900 text-emerald-900 dark:text-zinc-200 font-medium hover:bg-emerald-200/50 dark:hover:bg-zinc-800 border border-emerald-200/50 dark:border-zinc-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/querotti/" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-emerald-100/50 dark:bg-zinc-900 text-emerald-900 dark:text-zinc-200 font-medium hover:bg-emerald-200/50 dark:hover:bg-zinc-800 border border-emerald-200/50 dark:border-zinc-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-zinc-900 dark:text-white">
          <Cpu className="w-8 h-8 text-emerald-500" />
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((skillGroup, idx) => (
            <GlowCard key={idx}>
              <div className="p-6 h-full">
                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-200">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-emerald-100/50 dark:bg-zinc-800 text-emerald-800 dark:text-zinc-300 text-sm rounded-md font-mono border border-emerald-200/50 dark:border-transparent">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-zinc-900 dark:text-white">
          <Code2 className="w-8 h-8 text-emerald-500" />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <GlowCard key={idx}>
              <div className="group p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-all">
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </GlowCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-zinc-900 dark:text-white">
          <Terminal className="w-8 h-8 text-emerald-500" />
          Experience & Education
        </h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 dark:before:via-zinc-800 before:to-transparent">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-emerald-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#fafafa] dark:shadow-[0_0_0_4px_#09090b] z-10 transition-colors">
                <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              <GlowCard className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <div className="p-6 h-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{item.role}</h3>
                    <span className="text-sm font-mono text-emerald-600 dark:text-emerald-500/80 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded">{item.period}</span>
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 font-medium mb-3">{item.company}</div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">Let's build something together.</h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8">
          I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <a href="mailto:murilovieceliqrtt@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-lg hover:shadow-xl">
          <Mail className="w-5 h-5" />
          Say Hello
        </a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/50 py-12 mt-24">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Terminal className="w-5 h-5" />
          <span className="font-medium text-zinc-900 dark:text-white">Murilo.dev</span>
        </div>
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Murilo. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-zinc-500">
          <a href="https://github.com/querotti" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"><Github className="w-5 h-5" /></a>
          <a href="https://www.linkedin.com/in/querotti/" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="mailto:murilovieceliqrtt@gmail.com" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'never',
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      // 150px threshold from the right edge
      if (window.innerWidth - e.clientX <= 150) {
        document.body.classList.add('show-scrollbar');
      } else {
        document.body.classList.remove('show-scrollbar');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      osInstance.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 font-sans relative transition-colors duration-300">
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <div data-us-project="N9XzvQXu7fA5SY2ewADJ" style={{ width: '100%', height: '100%' }}></div>
        <div className="absolute inset-0 bg-white/80 dark:bg-transparent transition-colors duration-300"></div>
      </div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-24 space-y-32">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
