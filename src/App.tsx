import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="noise-overlay relative min-h-screen bg-background text-white antialiased overflow-x-hidden">
      {/* Ambient gradient orbs (fixed) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(ellipse at center, #63b3ed, transparent)',
            filter: 'blur(120px)',
            animation: 'orbFloat 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-8"
          style={{
            background: 'radial-gradient(ellipse at center, #b794f4, transparent)',
            filter: 'blur(100px)',
            animation: 'orbFloat 10s ease-in-out infinite 3s',
          }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full opacity-6"
          style={{
            background: 'radial-gradient(ellipse at center, #f687b3, transparent)',
            filter: 'blur(90px)',
            animation: 'orbFloat 14s ease-in-out infinite 6s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
