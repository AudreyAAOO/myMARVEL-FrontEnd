import "../assets/css/favorites.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Banniere_logos from "../assets/img/Banniere_logos.png";
import { FavoriteCard } from "../components/FavoriteCard";


const Favorites = () => {

	//! gestion des favoris
	// const [pinsChar, setPinsChar] = useState(
	// 	 // vérifier s'il y a qqch le storage
	// 		?  // vérifier qu'il existe des datas avant de parser sinon erreur
	// 		: []
	// );

	const recupPins = localStorage.getItem("pins");
	const arrayTest = JSON.parse(localStorage.getItem("pins"))

	console.log("recupPin", recupPins);
	console.log(arrayTest);
	//! faire une requete au back pour ne récupérer que les persos dont les id sont en favoris
	//? récupérer characterId ds le tableau du storage --> NON sinon pas de mise à jour possible si l'api change

	// Penser au use effect pour vérifier si le character est déjà ds les favoris (bien mettre if et ELSE)
	// + surveiller l'état de use isfavorite ds le tableau de dépendance de useEffect (sinon erreur)


	return (
		<div className="containerFavCharactersCard" >
			{/* // <div className="containerFavorites">
		// 	<img src={Banniere_logos} alt="banniere" />

		// 	<p>Votre collection est vide.</p>
		// 	<p>Sélectionnez vos items préférés en cliquant sur le <FontAwesomeIcon icon={["far", "heart"]} /></p>pinsChar={pinsChar} */}

			<h2>Mes super-héros préférés:</h2>
			{
				arrayTest.map((item) => {
					console.log("item", item)
					return (
						//! mettre la key ici sinon erreur
						<FavoriteCard key={item} pinsId={item} arrayTest={arrayTest} />
					)
				})
			}

		</div >
	)
};

export default Favorites;
