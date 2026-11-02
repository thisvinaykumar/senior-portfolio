import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import Summary from "./sections/Summary";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Architecture from "./sections/Architecture";
import Leadership from "./sections/Leadership";
import Contact from "./sections/Contact";
import Ecosystem from "./sections/Ecosystem";
import Blog from "./sections/Blog";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="space-y-32 px-6 md:px-16">
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Projects />
        <Architecture />
        <Leadership />
        <Blog/>
        <Ecosystem />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
