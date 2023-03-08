import "../assets/css/favorites.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banniere_logos from "../assets/img/Banniere_logos.png";


const Favorites = () => {

	const params = useParams();
	const characterId = params.characterId;

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					// `https://lereacteur-marvel-api.herokuapp.com/characters/${characterId}?apiKey=${process.env.API_KEY_MARVEL}`
					`https://127.0.0.1/characters/${characterId}?apiKey=${process.env.API_KEY_MARVEL}`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, [characterId]);




	// Penser au use effect pour vérifier si le character est déjà ds les favoris (bien mettre if et ELSE)
	// + surveiller l'état de use isfavorite ds le tableau de dépendance de useEffect (sinon erreur)
	// faire une requête à notre backend pour aller chercher les infos sur les personnages favoris
	// créer une route dans le backend qui va faire une requête à l'api pour aller chercher le character dans l'id est déjà ds les favoris/storage et qu'on veut réafficher.


	return
	// pinsChar.length > 0 ? (
	// 	<div className="containerFavorites">
	// 		<img src={Banniere_logos} alt="banniere" />

	// 		<p>Votre collection est vide.</p>
	// 		<p>Sélectionnez vos items préférés en cliquant sur le <FontAwesomeIcon icon={["far", "heart"]} /></p>
	// 	</div>

	// ) : (
	// 	<div className="containerFavorites">

	// 		<img src={Banniere_logos} alt="banniere" />

	// 		<h3>Mes super-héros préférés :</h3>

	// 		{/* {pinsChar.map((item, index) => {
	// 			return (<p key={index}> {item}</p>)})} */}

	// 		<p> {pinsChar}</p>


	// 	</div>
	// )
};

export default Favorites;
