import "../assets/css/favorites.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FavoriteCard = ({ pinsId, pinsChar, setPinsChar }) => {
	const handlePins = (pinsId) => {
		const copy = [...pinsChar];
		const indexID = copy.indexOf(pinsId);
		if (indexID === -1) {
			//* si id n'est pas dans le tab des favoris
			copy.push(pinsId);
		} else {
			copy.splice(indexID, 1);
			console.log("else indexID: ", indexID, "copy: ", copy);
		}

		setPinsChar(copy); //modifier le tableau copy
		localStorage.setItem("pins", JSON.stringify(copy)); // et après l’envoyer au localStorage
	};

	//! récupérer les images //! error
	let displayImg = (pinsId) => {
		return (
			// eslint-disable-next-line
			pinsId.thumbnail.path +
			`/standard_xlarge` +
			"." +
			pinsId.thumbnail.extension
		);
	};

	const redHeart = pinsChar.indexOf(pinsId) === -1;

	return (
		<>
			<div className="FavCharactersCard">
				<article>
					<h3>{pinsId.name}</h3>

					<div className="containerFavoriteImgChar">
						<img src={displayImg(pinsId)} alt="personnage" />

						<p>{pinsId.description}</p>
					</div>

					<FontAwesomeIcon
						className={
							redHeart ? "heartIconCharacters" : "redHeartIconCharacters"
						}
						icon={["far", "heart"]}
						// actionClick={() => handlePins(charId)}
						onClick={() => handlePins(pinsId)}
						// onClick={handlePins} //= Uncaught TypeError: Converting circular structure to JSON--> starting at object with constructor 'SVGPathElement'
					/>
				</article>
			</div>
		</>
	);
};
