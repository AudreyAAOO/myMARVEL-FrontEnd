import "../assets/css/favorites.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banniere_logos from "../assets/img/Banniere_logos.png";
import { FavoriteCard } from "../components/FavoriteCard";
import { RadarSpinner } from "react-epic-spinners";

const Favorites = ({ pinsChar, setPinsChar }) => {

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		if (pinsChar !== []) {
			const fetchData = async () => {
				try {

					const response = await axios.post(
						//! faire une nouvelle route et passer la liste des favoris (char, comics) en body
						`http://localhost:3100/favorites`,
						//? mettre http et non https sur postman aussi
						{
							pinsChar, //! passer en post le tableau d'objet
						}
					);

					setData(response.data);
					console.log(response.data);
					setIsLoading(false);

				} catch (error) {
					console.log("error.response.data: ", error.response.data);
					console.log("error.response.data.message: ", error.response.data.message);
				}
			};
			fetchData();
		}

	}, [pinsChar]);



	// boucler dessus 
	// fr une requete en front sur chaque tour de boucler
	// vérifier longueur du tableau pr savoir si ya toutes les réponses

	//TODO si comics en plus , on peut faire une même route pr les characters et comics
	//TODO juste ajouter un body en plus



	return isLoading ? (
		//  <p>Loading ...!</p>
		<div className="loadingRadarSpinner">
			<RadarSpinner color="red" />
		</div>
	) : (
		<div className="containerFavCharactersCard">
			{pinsChar === [] ? (
				<div className="containerFavorites">
					<img src={Banniere_logos} alt="banniere" />
					<p>Votre collection est vide.</p>
					<p>Sélectionnez vos items préférés en cliquant sur le <FontAwesomeIcon icon={["far", "heart"]} /></p>
				</div>
			) : (<>
				<h2>Mes super-héros préférés:</h2>
				{
					pinsChar.map((item) => {
						// console.log("item", item)
						return (
							//! mettre la key ici sinon erreur
							<FavoriteCard key={item} pinsId={item} pinsChar={pinsChar} setPinsChar={setPinsChar} />
						)
					})}
			</>)}
		</div>)


};



export default Favorites;
