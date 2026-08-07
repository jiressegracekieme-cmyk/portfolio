import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Services } from '@/components/sections/services';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Certifications } from '@/components/sections/certifications';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Certifications />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
