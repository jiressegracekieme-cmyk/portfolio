'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { projects, projectCategories } from '@/lib/data';
import Image from 'next/image';

export function Projects() {
  const [filter, setFilter] = useState('Tous');
  const filtered = filter === 'Tous' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Projets"
          title={<>Mes <span className="gradient-text">réalisations</span></>}
          subtitle="Une sélection de projets couvrant le développement, la data, les réseaux, la sécurité et l'audiovisuel."
        />

        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'gradient-blue text-white shadow-lg shadow-primary/30'
                    : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group glass rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {project.date}
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Démo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
