import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Articles from './components/Articles';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <main className="min-h-screen transition-colors duration-300">
        <Navigation />
        <Hero />
        <div id="about" className="sr-only">About Section Hook</div>
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Articles />
        <Footer />
      </main>
    </ThemeProvider>
  );
};

export default App;