'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, User, MessageSquare } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/animation-helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { personalInfo } from '@/lib/data';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Téléphone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Localisation', value: personalInfo.location, href: '#' },
  ];

  const socials = [
    { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: Github, label: 'GitHub', href: personalInfo.github },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute top-0 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-accent/10 blur-[120px] -z-10" />
      <div className="container-max">
        <SectionHeading
          badge="Contact"
          title={<>Travaillons <span className="gradient-text">ensemble</span></>}
          subtitle="Une idée, un projet ou une opportunité ? N'hésitez pas à me contacter, je vous réponds rapidement."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 h-full">
              <h3 className="text-xl font-bold mb-6">Informations de contact</h3>
              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 rounded-2xl p-4 hover:bg-primary/5 transition-colors group"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-blue text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">{item.label}</span>
                        <span className="block text-sm font-semibold">{item.value}</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">Retrouvez-moi sur</p>
                <div className="flex gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-12 w-12 items-center justify-center rounded-xl glass hover:gradient-blue hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Votre nom" required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="vous@exemple.com" required className="rounded-xl" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+241 ..." className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Objet du message" required className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Décrivez votre projet ou votre demande..." rows={5} required className="rounded-xl resize-none" />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading || submitted}
                className="w-full gradient-blue text-white hover:opacity-90"
              >
                {loading ? (
                  'Envoi en cours...'
                ) : submitted ? (
                  'Message envoyé !'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
