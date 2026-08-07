'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Shield, Zap, BookOpen, Target, Eye, CheckCircle2 } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { aboutValues } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Lightbulb, Shield, Zap, BookOpen,
};

export function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="À propos"
          title={<>Un profil <span className="gradient-text">polyvalent</span> au service de la technologie</>}
          subtitle="Passionné par la technologie sous toutes ses formes, j'allie expertise en développement, analyse de données, réseaux, sécurité et audiovisuel pour offrir des solutions complètes."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-blue text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Mission</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Accompagner entreprises et particuliers dans leur transformation digitale en concevant
                des solutions technologiques sur mesure, fiables et innovantes qui répondent à leurs
                besoins spécifiques.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-8 h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-blue text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Vision</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Devenir un acteur incontournable de l'écosystème technologique africain en démontrant
                qu'il est possible de concevoir, déployer et sécuriser des infrastructures de classe
                internationale depuis le continent.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="glass rounded-3xl p-8 h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Valeurs</h3>
              <div className="space-y-3">
                {aboutValues.map((v) => {
                  const Icon = iconMap[v.icon] ?? CheckCircle2;
                  return (
                    <div key={v.title} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold">{v.title}</span>
                        <span className="block text-xs text-muted-foreground">{v.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Développement logiciel', icon: '💻' },
              { label: 'Analyse de données', icon: '📊' },
              { label: 'Réseaux informatiques', icon: '🌐' },
              { label: 'Sécurité électronique', icon: '🔒' },
              { label: 'Audiovisuel', icon: '🎬' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
