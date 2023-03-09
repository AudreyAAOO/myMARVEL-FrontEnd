import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CharacterCard = ({ character }) => {
	
	const [isFavorite, setIsFavorite] = useState(false);

	//! gestion des favoris
	const [pinsChar, setPinsChar] = useState(
		localStorage.getItem("pins") // vérifier s'il y a qqch le storage
			? JSON.parse(localStorage.getItem("pins")) // vérifier qu'il existe des datas avant de parser sinon erreur
			: []
	);

	const handlePins = (charId) => {
		const copy = [...pinsChar];
		const indexID = copy.indexOf(charId);
		if (indexID === -1) {
			//* si id n'est pas dans le tab des favoris
			copy.push(charId);
		} else {
			copy.splice(indexID, 1);
			console.log("else indexID: ", indexID, "copy: ", copy);
		}

		setPinsChar(copy); //modifier le tableau copy
		localStorage.setItem("pins", JSON.stringify(copy)); // et après l’envoyer au localStorage
	};

	useEffect(() => {
		const result = pinsChar.indexOf(character._id);
		if (result === -1) {
			//* si id n'est pas dans le tab des favoris
			setIsFavorite(false);
		} else {
			setIsFavorite(true);
		}
	}, [isFavorite, character._id, pinsChar]);
	//React Hook useEffect has missing dependencies: 'character._id' and 'pinsChar'

	//! récupérer les images
	let displayImg = (character) => {
		// eslint-disable-next-line
		return (
			character.thumbnail.path +
			`/standard_xlarge` +
			"." +
			character.thumbnail.extension
		);
	};

	const charId = character._id;

	return (
		<div className="charactersCard">
			<article>
				<h2>{character.name}</h2>
				<Link
					// character={character}
					to={`/comics/${character._id}`}
					characterid={character._id}
				>
					<div className="containerImgChar">
						<img
							src={displayImg(character)}
							alt="personnage"
							key={character._id}
						/>
					</div>
				</Link>

				<div className="containerDescription">
					<p>{character.description}</p>

					<FontAwesomeIcon
						className={
							isFavorite ? "redHeartIconCharacters" : "heartIconCharacters"
						}
						icon={["far", "heart"]}
						// actionClick={() => handlePins(charId)}
						onClick={() => handlePins(charId)}
						// onClick={handlePins} //= Uncaught TypeError: Converting circular structure to JSON--> starting at object with constructor 'SVGPathElement'
					/>
				</div>
			</article>
		</div>
	);
};
