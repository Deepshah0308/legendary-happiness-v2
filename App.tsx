import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Articles from './components/Articles';
import Footer from './components/Footer';

const App: React.FC = () => (
  <div style={{ background: '#000' }}>
    <Navigation />
    <Hero />
    <Skills />
    <Experience />
    <Projects />
    <Certifications />
    <Articles />
    <Footer />
  </div>
);

export default App;