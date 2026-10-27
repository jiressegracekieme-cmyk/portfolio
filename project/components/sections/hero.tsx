'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NetworkBackground } from '@/components/network-background';
import { AnimatedCounter } from '@/components/animation-helpers';
import { personalInfo, stats } from '@/lib/data';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12"
    >
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 opacity-60">
        <NetworkBackground />
      </div>
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px] -z-10" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Disponible pour de nouveaux projets
            </motion.div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground">Jiresse Grace</span>
              <span className="block gradient-text">KIEME</span>
            </h1>

            <div className="mt-6 h-9 overflow-hidden text-center lg:text-left">
              <motion.div
                animate={{ y: ['0%', '-25%', '-50%', '-75%', '0%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col gap-2 text-xl font-semibold text-muted-foreground sm:text-2xl"
              >
                {personalInfo.titles.map((title) => (
                  <span key={title} className="h-9 flex items-center justify-center lg:justify-start">
                    {title}
                  </span>
                ))}
              </motion.div>
            </div>

            <p className="mt-6 text-base text-muted-foreground sm:text-lg max-w-xl mx-auto lg:mx-0 text-balance">
              {personalInfo.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" className="gradient-blue text-white hover:opacity-90 group" asChild>
                <a href="#projects">
                  Voir mes projets
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Me contacter
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 gradient-blue rounded-full blur-2xl opacity-30 animate-pulse-glow" />
              <div className="absolute -inset-2 gradient-blue rounded-full blur-xl opacity-20" />
              <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl">
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-2 shadow-lg"
              >
                <span className="text-sm font-semibold gradient-text">30+ technologies</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold gradient-text">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
