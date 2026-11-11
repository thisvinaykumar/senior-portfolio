import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Backdrop from "./components/layout/Backdrop";
import CommandPalette from "./components/dock/CommandPalette";
import Dock from "./components/dock/Dock";
import Hero from "./sections/Hero";
import Summary from "./sections/Summary";
import Architecture from "./sections/Architecture";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Leadership from "./sections/Leadership";
import Blog from "./sections/Blog";
import Ecosystem from "./sections/Ecosystem";
import Contact from "./sections/Contact";

// The storyboard: hook → profile → systems → career → work → stack → people → writing → elsewhere → contact.
export default function App() {
    return (
        <>
            <Backdrop />
            <Navbar />
            <main>
                <Hero />
                <Summary />
                <Architecture />
                <Experience />
                <Projects />
                <Skills />
                <Leadership />
                <Blog />
                <Ecosystem />
                <Contact />
            </main>
            <Footer />
            <Dock />
            <CommandPalette />
        </>
    );
}
