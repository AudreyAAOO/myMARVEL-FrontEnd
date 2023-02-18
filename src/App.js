
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// 


// import des pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Page404 from './pages/Page404';
// import Favorites from "./pages/Favorites";


// import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";


// import des icones 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import ComicsByCharactersId from "./pages/ComicsByCharactersId";
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
  const [fav, setFav] = useState(Cookies.get("myFavoritesComics") || null);



  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  // const handleFav = (fav) => {
  //   if (fav) {
  //     setFav(fav);
  //     Cookies.set("myFavoritesComics", fav, { expires: 365 });
  //   } else {
  //     setFav(null);
  //     Cookies.remove("myFavoritesComics");
  //   }
  // };





  return (
    <Router>
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Characters skip={skip} setSkip={setSkip} limit={limit} setLimit={setLimit} />} />
        <Route path="/comics" element={<Comics />} />{/*handleFav={handleFav} fav={fav}*/}
        <Route path="/comics/:characterId" element={<ComicsByCharactersId />} />
        {/* <Route path="/favorites" element={<Favorites />} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
