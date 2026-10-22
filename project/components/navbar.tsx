'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, Download, MessageCircle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/data';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Expériences', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-border/50 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#accueil" className="flex items-center gap-2.5 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl gradient-blue text-white font-bold text-lg shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
              {personalInfo.initials}
              <div className="absolute inset-0 rounded-xl gradient-blue opacity-50 blur-md -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold leading-tight">{personalInfo.name}</span>
              <span className="block text-xs text-muted-foreground">Full Stack • Data • Réseaux</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl"
              aria-label="Changer le thème"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
              asChild
            >
              <a href="#contact">
                <MessageCircle className="mr-1.5 h-4 w-4" />
                Me contacter
              </a>
            </Button>
            <Button
              size="sm"
              className="hidden md:inline-flex gradient-blue text-white hover:opacity-90"
              asChild
            >
              <a href={personalInfo.cv} target="_blank" rel="noopener noreferrer">
                <Download className="mr-1.5 h-4 w-4" />
                CV
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden glass border-t border-border/50"
            >
              <div className="container-max px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="flex-1 gradient-blue text-white" asChild>
                    <a href="#contact">
                      <MessageCircle className="mr-1.5 h-4 w-4" />
                      Me contacter
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={personalInfo.cv} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-1.5 h-4 w-4" />
                      CV
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full gradient-blue text-white shadow-lg shadow-primary/40 hover:scale-110 transition-transform"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
