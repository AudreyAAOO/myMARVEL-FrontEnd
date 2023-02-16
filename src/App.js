import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import des pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
// import Favorites from "./pages/Favorites";

// import des composants
// import Header from "./components/Header.jsx";
// import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>
      {/* <Route path="/" element={<Header />} /> */}
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/" element={<Comics />} />
        {/* <Route path="/" element={<Favorites />} /> */}
      </Routes>
      {/* <Route path="/" element={<Footer />} /> */}
    </Router>
  );
}

export default App;
