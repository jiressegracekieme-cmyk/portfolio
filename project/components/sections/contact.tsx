'use client';

import { useEffect, useState } from 'react';
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
  const [error, setError] = useState('');
  const [formStartedAt, setFormStartedAt] = useState('');

  useEffect(() => {
    setFormStartedAt(Date.now().toString());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(form);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        throw new Error(result?.error || "L'envoi du message a échoué. Veuillez réessayer.");
      }

      form.reset();
      setFormStartedAt(Date.now().toString());
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
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
              <input type="hidden" name="formStartedAt" value={formStartedAt} />
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" name="name" autoComplete="name" placeholder="Votre nom" required maxLength={100} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" required maxLength={254} className="rounded-xl" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" autoComplete="tel" placeholder="+241 ..." maxLength={40} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" name="subject" placeholder="Objet du message" required maxLength={150} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Décrivez votre projet ou votre demande..." rows={5} required maxLength={5000} className="rounded-xl resize-none" />
              </div>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              {submitted && (
                <p role="status" className="text-sm text-green-600">
                  Votre message a bien été envoyé. Merci de m&apos;avoir contacté !
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={loading || submitted || !formStartedAt}
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
