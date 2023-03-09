import "../assets/css/favorites.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banniere_logos from "../assets/img/Banniere_logos.png";


const Favorites = () => {

	// const params = useParams();
	// console.log(params);

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);

	//? gestion des favoris
	const [pinsChar, setPinsChar] = useState(
		localStorage.getItem('pins')
			? JSON.parse(localStorage.getItem('pins'))
			: [])

	console.log("id ds storage:", pinsChar[0]);
	const characterId = "5fcf91fed8a2480017b91467";
	//! récupérer characterId ds le tableau du storage
	// const fetchCharId = () = {  }
	// Penser au use effect pour vérifier si le character est déjà ds les favoris (bien mettre if et ELSE)
	// + surveiller l'état de use isfavorite ds le tableau de dépendance de useEffect (sinon erreur)
	//! faire une requete au back pour ne récupérer que les id en favoris
	//// créer une route dans le backend qui va faire une requête à l'api pour aller chercher le character dans l'id est déjà ds les favoris/storage et qu'on veut réafficher.


	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--mymarvel--hw4gvwsxlwd5.code.run/characters/${characterId}`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, []); //characterId


	return (isLoading ? (
		<p>Loading ...!</p>
	) : (
		<div className="containerFavorites">
			<img src={Banniere_logos} alt="banniere" />

			<p>Votre collection est vide.</p>
			<p>Sélectionnez vos items préférés en cliquant sur le <FontAwesomeIcon icon={["far", "heart"]} /></p>


			{/* si favoris ds le storage, les afficher : */}
			{/* <h3>Mes super-héros préférés :</h3> */}

			{/* {data.results.map((item) => {
				// { console.log(data.results) }
				return (
					//! mettre la key ici sinon erreur
					<FavoriteCard />
				)
			})} */}
		</div>))
};

export default Favorites;
