import React from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
