
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// 


// import des pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Page404 from './pages/Page404';
import Favorites from "./pages/Favorites";
import ComicsByCharactersId from "./pages/ComicsByCharactersId";

// import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";


// import des icones 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
library.add(faHeart);


function App() {
  // function decode(str) {
  //   let txt = new DOMParser().parseFromString(str, "text/html");
  //   return txt.documentElement.textContent;
  // }

  // let encodedStr = "&lt;p&gt;";
  // let decodedStr = decode(encodedStr);
  // console.log(decodedStr);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  // const [pins, setPins] = useState(Cookies.get("myFavorites") || null);
  const [pinsChar, setPinsChar] = useState(Cookies.get("myFavoritesChar") || []);


  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handlePins = () => {
    if (pinsChar) {
      const copy = [...pinsChar];
      // copy.push(pinsChar);
      setPinsChar(copy);
      Cookies.set("myFavoritesChar", pinsChar, { expires: 666 });
    } else {
      setPinsChar([]);
      Cookies.remove("myFavorites");
    }
  };


  return (<>
    <Router>
      <Header />
      <Menu />
      {/* setPins={setPins} pins={pins} */}
      <Routes>
        <Route path="/" element={<Characters handlePins={handlePins} setPinsChar={setPinsChar} pinsChar={pinsChar} skip={skip} setSkip={setSkip} limit={limit} setLimit={setLimit} />} />
        <Route path="/comics" element={<Comics skip={skip} setSkip={setSkip} limit={limit} setLimit={setLimit} />} />
        <Route path="/comics/:characterId" element={<ComicsByCharactersId />} />
        <Route path="/favorites" element={<Favorites pinsChar={pinsChar} />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>

  </>);
}

export default App;
