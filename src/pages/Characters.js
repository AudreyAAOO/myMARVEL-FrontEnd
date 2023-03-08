import "../assets/css/characters.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

// import des composants
import Button from "../components/Button";
import Search from "../components/Search";


const Characters = () => {

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [searchC, setSearchC] = useState("");

	//? gestion pagination
	const [skip, setSkip] = useState(0);
	const [limit] = useState(100);
	const [isLastPage, setIsLastPage] = useState(false);

	//? gestion des favoris
	const [pinsChar, setPinsChar] = useState(
		localStorage.getItem('pins')               // vérifier s'il y a qqch le storage
			? JSON.parse(localStorage.getItem('pins')) // vérifier qu'il existe des datas avant de parser sinon erreur
			: [])


	const [isFavorite, setIsFavorite] = useState(false)   // ds le use effet vérifier si le character est ds les favoris

	//! test pr afficher les cards



	// const handlePins = () => {
	// };

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`https://site--mymarvel--hw4gvwsxlwd5.code.run/characters?name=${searchC}&skip=${skip}&limit=${limit}`);
				setData(response.data);
				setIsLoading(false);
				setIsLastPage(((response.data.count - (skip + limit)) <= 0 ? true : false));
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchData();
	}, [searchC, skip, limit]); // = surveiller ce qu'il yu ds le tableau de dépendance, si ces variables changent, il faut se réexecuter

	let displayImg = (character) => {
		// eslint-disable-next-line
		return character.thumbnail.path + `/standard_xlarge` + "." + character.thumbnail.extension
	};

	const research = (e) => {
		console.log(e.target.value);
		setSearchC(e.target.value);
		setSkip(0);
	}

	const nextPage = () => {
		setSkip(skip + limit);
	}

	const prevPage = () => {
		if ((skip - limit) > -1) { // 100 - 100  = 0 > -1  
			setSkip(skip - limit);
		}
	}

	return isLoading ? (
		<p>Loading ...!</p>
	) : (<>

		<div className="menuSearch">

			<Search className="search" onChange={(e) => research(e)} name="rechercher un personnage" value={searchC} />

			<div className="buttonsPages">

				<Button className={skip === 0 ? "noBtn" : "btnPrev"} actionClick={() => prevPage()} name="page précédente" value="page précédente" />
				<Button className={isLastPage ? "noBtn" : "btnNext"} actionClick={() => nextPage()} name="page suivante" value="page suivante" />

				{skip !== 1 && <p>page : {skip / 100}</p>}

			</div>
		</div>


		<div className="container">
			{data.results.map((character, i) => {
				return (
					// faire un composant character card et créer le state isFavorite dedans pr qu'il s'applique à chaque tour à chaque character (et non au 100 d'un coup.)
					// Penser au use effect pour vérifier si le character est déjà ds les favoris (bien mettre if et ELSE)
					// + surveiller l'état de use isfavorite ds le tableau de dépendance de useEffect (sinon erreur)
					// faire une requête à notre backend pour aller chercher les infos sur les personnages favoris
					// créer une route dans le backend qui va faire une requête à l'api pour aller chercher le character dans l'id est déjà ds les favoris/storage et qu'on veut réafficher.

					<div key={i} className="charactersCard">

						<article key={character._id}>
							<h2>{character.name}</h2>
							<Link character={character} to={`/comics/${character._id}`} characterid={character._id}>

								<div key={character._id} className="containerImgChar">
									<img src={displayImg(character)} alt="personnage" key={character._id} />
								</div>
							</Link>

							<div key={character._id} className="containerDescription">
								<p key={character._id}>{character.description}</p>
								<FontAwesomeIcon
									className={(isFavorite ? "redHeartIconCharacters" : "heartIconCharacters")}
									icon={["far", "heart"]}
									// onClick={(e) => handlePins(e)}
									onClick={() => {
										const charId = character._id;
										const copy = [...pinsChar];
										const result = copy.indexOf(charId)
										if (result === -1) { //* si id n'est pas dans le tab des favoris
											copy.push(charId);
											localStorage.setItem('pins', JSON.stringify(copy));
											console.log("if result: ", result, "copy: ", copy);
										} else {
											copy.splice(result, 1)
											localStorage.removeItem(result);
											console.log("else result: ", result, "copy: ", copy);
										}
										setPinsChar(copy);
										console.log("PinsChar: ", pinsChar, "copy: ", copy);
									}
									}
								/>
							</div>
						</article>
					</div>
				)
			})}
		</div>
	</>)
};

export default Characters;
