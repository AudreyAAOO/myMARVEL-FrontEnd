import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banniere_logos from "../assets/img/Banniere_logos.png";

export const FavoriteCard = ({ pinsId, arrayTest }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);

	console.log("pinsId", pinsId);
	// ds le use effect vérifier si le character est ds les favoris

	useEffect(() => {
		const copy = [...arrayTest];
		const indexID = copy.indexOf(pinsId);
		if (indexID === -1) {
			//* si pinsId n'est pas dans le tab des favoris
			setIsFavorite(false);
		} else {
			setIsFavorite(true);
		}
	}, [isFavorite, pinsId]);

	const characterId = pinsId;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--mymarvel--hw4gvwsxlwd5.code.run/character/${characterId}`
				);
				setData(response.data);
				console.log(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log("error.response.data: ", error.response.data);
			}
		};

		fetchData();
	}, [characterId]);

	//! récupérer les images
	let displayImg = (data) => {
		// eslint-disable-next-line
		return (
			data.thumbnail.path + `/standard_xlarge` + "." + data.thumbnail.extension
		);
	};

	return isLoading ? (
		<p>Loading ...!</p>
	) : isFavorite ? (
		<div className="FavCharactersCard">
			<article>
				<h3>{data.name}</h3>

				<div className="containerFavoriteImgChar">
					<img src={displayImg(data)} alt="personnage" />

					<p>{data.description}</p>
				</div>
			</article>
		</div>
	) : (
		<div className="containerFavorites">
			<img src={Banniere_logos} alt="banniere" />

			<p>Votre collection est vide.</p>
			<p>
				Sélectionnez vos items préférés en cliquant sur le
				<FontAwesomeIcon icon={["far", "heart"]} />
			</p>
		</div>
	);
};
