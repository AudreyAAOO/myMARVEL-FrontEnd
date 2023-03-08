import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CharacterCard = ({ character, actionClick }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	// ds le use effet vérifier si le character est ds les favoris

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
		<div key={character._id} className="charactersCard">
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
