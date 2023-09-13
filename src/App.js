import {
  Work,
  Testimonial,
  Skills,
  Header,
  Footer,
  About,
  Education,
} from "./container/index.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Education />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;
