import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Jiresse Grace KIEME | Développeur Full Stack & Data Analyst',
  description:
    "Portfolio de Jiresse Grace KIEME — Développeur Full Stack, Data Analyst, Expert Réseaux & Sécurité, Technicien Audiovisuel. Je conçois des solutions digitales modernes et déploie des infrastructures technologiques fiables.",
  keywords: [
    'Jiresse Grace KIEME', 'Développeur Full Stack', 'Data Analyst', 'Réseaux', 'Sécurité électronique', 'Vidéosurveillance', 'Audiovisuel', 'Next.js', 'React', 'Python', 'Portfolio',
  ],
  authors: [{ name: 'Jiresse Grace KIEME' }],
  openGraph: {
    title: 'Jiresse Grace KIEME | Développeur Full Stack & Data Analyst',
    description: "Solutions digitales modernes, analyse de données et infrastructures technologiques fiables.",
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/images/mon_image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jiresse Grace KIEME | Portfolio',
    description: 'Développeur Full Stack • Data Analyst • Réseaux & Sécurité',
    images: [{ url: '/images/mon_image.png' }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={jakarta.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
