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
	}, [searchC, skip, limit]); // = surveiller ce qu'il y a ds le tableau de dépendance, si ces variables changent, il faut se réexecuter


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
				return (
					//! mettre la key ici sinon erreur
					<CharacterCard key={character._id} character={character} />
				)
			})}
		</div>
	</>)
};

export default Characters;
