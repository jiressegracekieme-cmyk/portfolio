'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { experiences } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Expériences"
          title={<>Mon <span className="gradient-text">parcours</span> professionnel</>}
          subtitle="6 mois d'expérience cumulée à travers des rôles variés en développement, data, réseaux, sécurité et audiovisuel."
        />

        <div className="mt-16 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.1}>
              <div className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full gradient-blue ring-4 ring-background shadow-lg shadow-primary/30 md:-translate-x-2 z-10" />

                <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                  >
                    <div className={`flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold">{exp.role}</h3>
                    <div className={`flex items-center gap-1.5 text-sm text-muted-foreground mt-1 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Briefcase className="h-3.5 w-3.5" />
                      {exp.company}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className={`mt-4 space-y-1.5 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.missions.map((m) => (
                        <li key={m} className={`flex items-start gap-2 text-sm ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{m}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-4 flex flex-wrap gap-1.5 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.technologies.map((t) => (
                        <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
