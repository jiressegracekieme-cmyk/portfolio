'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowUp, Heart } from 'lucide-react';
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

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-muted/20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <a href="#accueil" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-blue text-white font-bold text-lg shadow-lg shadow-primary/30">
                {personalInfo.initials}
              </div>
              <div>
                <span className="block text-sm font-bold leading-tight">{personalInfo.name}</span>
                <span className="block text-xs text-muted-foreground">Développeur | Data | Réseaux | Sécurité</span>
              </div>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {personalInfo.description}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: Github, href: personalInfo.github, label: 'GitHub' },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl glass hover:gradient-blue hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${personalInfo.email}`} className="block hover:text-primary transition-colors">
                {personalInfo.email}
              </a>
              <span className="block">{personalInfo.phone}</span>
              <span className="block">{personalInfo.location}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="mt-5 inline-flex items-center gap-2 rounded-xl gradient-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30"
            >
              <ArrowUp className="h-4 w-4" />
              Retour en haut
            </motion.button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Conçu avec <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> et passion
          </p>
        </div>
      </div>
    </footer>
  );
}
