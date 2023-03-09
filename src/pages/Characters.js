import "../assets/css/characters.css";
import { useEffect, useState } from "react";
import axios from "axios";



// import des composants
import Button from "../components/Button";
import Search from "../components/Search";
import { CharacterCard } from "../components/CharacterCard";  //! ? 


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


	const handlePins = (charId) => {
		const copy = [...pinsChar];
		const indexID = copy.indexOf(charId)
		if (indexID === -1) { //* si id n'est pas dans le tab des favoris
			copy.push(charId);
			setPinsChar(copy);

			// console.log("if indexID: ", indexID, "copy: ", copy);
		} else {
			copy.splice(indexID, 1)

			//modifier le tableau copy 
			// et après le if/else tu l’envoies au localStorage 
			setPinsChar(copy);
			// localStorage.removeItem(copy);

			console.log("else indexID: ", indexID, "copy: ", copy);
		}

		localStorage.setItem('pins', JSON.stringify(copy));
		// setPinsChar(copy);

		// console.log("PinsChar: ", pinsChar);

	};

	useEffect(() => {
		const fetchData = async () => {
			console.log("useEffect ok ");
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
	}, [searchC, skip, limit, pinsChar]); // = surveiller ce qu'il y a ds le tableau de dépendance, si ces variables changent, il faut se réexecuter


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

			<Search
				className="search"
				onChange={(e) => research(e)}
				name="rechercher un personnage"
				value={searchC} />

			<div className="buttonsPages">

				<Button className={skip === 0 ? "noBtn" : "btnPrev"} actionClick={() => prevPage()} name="page précédente" value="page précédente" />
				<Button className={isLastPage ? "noBtn" : "btnNext"} actionClick={() => nextPage()} name="page suivante" value="page suivante" />

				{skip !== 1 && <p>page : {skip / 100}</p>}

			</div>
		</div>


		<div className="container">
			{data.results.map((character) => {
				const charId = character._id
				// console.log(charId);
				return (
					//! mettre la key ici sinon erreur

					<CharacterCard key={character._id} pinsChar={pinsChar} character={character} actionClick={() => handlePins(charId)} />
				)
			})}
		</div>
	</>)
};

export default Characters;
