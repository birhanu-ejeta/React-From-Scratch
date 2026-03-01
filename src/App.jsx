import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Tours from "./components/Tours";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Tours />
        <Footer />
      </div>
    </div>
  );
}

export default App;
