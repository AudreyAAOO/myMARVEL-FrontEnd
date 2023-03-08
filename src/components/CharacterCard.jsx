import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CharacterCard = ({ character, actionClick, pinsChar }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	// ds le use effet vérifier si le character est ds les favoris

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

	// const charId = character._id;

	return (
		<div className="charactersCard">
			<article>
				<h2>{character.name}</h2>
				<Link
					character={character}
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
						// onClick={() => {handlePins(charId);}}
						onClick={actionClick}
					/>
				</div>
			</article>
		</div>
	);
};
