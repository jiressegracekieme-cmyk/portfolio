'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { blogPosts } from '@/lib/data';
import Image from 'next/image';

const categoryColors: Record<string, string> = {
  'Développement Web': 'from-blue-600 to-blue-400',
  'Data Science': 'from-cyan-500 to-sky-400',
  'Réseaux': 'from-sky-500 to-blue-500',
  'Cybersécurité': 'from-blue-700 to-cyan-500',
  'Sécurité': 'from-slate-600 to-slate-400',
};

export function Blog() {
  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/3 left-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Blog"
          title={<>Articles & <span className="gradient-text">insights</span></>}
          subtitle="Mes pensées sur le développement web, la data science, l'IA, les réseaux et la cybersécurité."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group glass rounded-3xl overflow-hidden h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/70 to-transparent" />
                  <span className={`absolute top-3 left-3 rounded-full bg-gradient-to-r ${categoryColors[post.category] ?? 'from-blue-600 to-blue-400'} px-3 py-1 text-xs font-medium text-white`}>
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
