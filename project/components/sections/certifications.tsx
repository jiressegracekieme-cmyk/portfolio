'use client';

import { motion } from 'framer-motion';
import { Code2, BarChart3, Network, ShieldCheck, Monitor, Music, GraduationCap, BadgeCheck, ExternalLink } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { certifications } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Code2, BarChart3, Network, ShieldCheck, Monitor, Music, GraduationCap,
};

export function Certifications() {
  return (
    <section id="certifications" className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-accent/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Certifications"
          title={<>Mes <span className="gradient-text">diplômes</span> & certifications</>}
          subtitle="Des certifications reconnues qui valident mon expertise technique à travers différents domaines."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon] ?? BadgeCheck;
            return (
              <Reveal key={cert.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group glass rounded-3xl p-6 h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cert.color} text-white shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <BadgeCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-5 text-base font-bold leading-snug">{cert.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold gradient-text">{cert.year}</span>
                    <a
                      href={cert.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Vérifier
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
