'use client';

import { motion } from 'framer-motion';
import { Globe, BarChart2, Network, Camera, Tv2, Check } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { services } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Globe, BarChart2, Network, Camera, Tv2,
};

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Services"
          title={<>Des solutions <span className="gradient-text">de bout en bout</span></>}
          subtitle="De la conception d'applications à l'installation de systèmes de sécurité, un accompagnement complet pour vos besoins technologiques."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe;
            const isLarge = i === 0;
            return (
              <Reveal key={service.id} delay={i * 0.1} className={isLarge ? 'lg:col-span-1' : ''}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative glass rounded-3xl p-8 h-full overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${service.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative mt-6 text-xl font-bold">{service.title}</h3>
                  <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="relative mt-5 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            );
          })}

          <Reveal delay={services.length * 0.1}>
            <div className="relative h-full min-h-[280px] rounded-3xl gradient-blue overflow-hidden flex flex-col items-center justify-center p-8 text-center text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90" />
              <div className="relative">
                <h3 className="text-2xl font-bold">Un projet en tête ?</h3>
                <p className="mt-2 text-white/80 text-sm">Discutons de la façon dont je peux vous aider à le concrétiser.</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary hover:scale-105 transition-transform"
                >
                  Démarrer un projet
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
