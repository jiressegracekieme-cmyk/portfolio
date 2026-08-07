'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, BarChart3, Network, ShieldCheck, Monitor, ChevronRight } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { skillCategories } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Code2, BarChart3, Network, ShieldCheck, Monitor,
};

export function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Compétences"
          title={<>Une expertise <span className="gradient-text">multidisciplinaire</span></>}
          subtitle="Maîtrise d'un large éventail de technologies couvrant le développement, la data, les réseaux, la sécurité et l'audiovisuel."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-2">
            {skillCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? Code2;
              const isActive = active === cat.id;
              return (
                <Reveal key={cat.id} delay={i * 0.05}>
                  <button
                    onClick={() => setActive(cat.id)}
                    className={`w-full flex items-center gap-3 rounded-2xl px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'glass border border-primary/30 shadow-lg shadow-primary/10'
                        : 'border border-transparent hover:bg-card/50'
                    }`}
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-sm font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {cat.label}
                    </span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isActive ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">{current.label}</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {current.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${current.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
