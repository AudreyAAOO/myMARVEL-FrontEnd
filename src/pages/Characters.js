import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/characters.css";
import Cookies from "js-cookie";

// import des composants
import Button from "../components/Button";
import Search from "../components/Search";


const Characters = ({ handlePins, setPinsChar, pinsChar }) => {

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [searchC, setSearchC] = useState("");
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(100);
	const [isLastPage, setIsLastPage] = useState(false);
	// const [nbrPages, setNbrPages] = useState(0);
	// const [pinsChar, setPinsChar] = useState(Cookies.get("myFavoritesChar") || null);



	// const navigate = useNavigate();


	useEffect(() => {

		const fetchData = async () => {
			try {
				const response = await axios.get(`https://site--mymarvel--hw4gvwsxlwd5.code.run/characters?name=${searchC}&skip=${skip}&limit=${limit}`);
				// console.log(response.data);
				setData(response.data);
				setIsLoading(false);
				setIsLastPage(((response.data.count - (skip + limit)) <= 0 ? true : false));
				// setNbrPages = (data.count - skip) / limit;
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchData();
	}, [searchC, skip, limit]);

	let displayImg = (character) => { return character.thumbnail.path + `/standard_xlarge` + "." + character.thumbnail.extension };

	const research = (e) => {
		console.log(e.target.value);
		setSearchC(e.target.value);
		setSkip(0);
	}

	const nextPage = () => {
		setSkip(skip + limit);
		// const copy = [...data.results];
		// copy[index]++;
		// setSkip(skip + limit);
		// `characters?skip=${skip}&limit=${limit}
		// navigate(`/`);
	}

	const prevPage = () => {
		if ((skip - limit) > -1) { // 100 - 100  = 0 > -1  
			setSkip(skip - limit);
		}
	}


	// const handlePinsChar = (characterId) => {
	// 	// setPinsChar(characterId);
	// 	Cookies.set("myFavoritesChar", pinsChar, { expires: 666 });
	// 	console.log(pinsChar);
	// }

	// let nbrPages = (data.count - skip) / limit;
	// let nbrPagesAAfficher = 10;
	// if (nbrPages < 10) {
	// 	nbrPagesAAfficher = nbrPages;
	// }
	// const page = () => {

	// for (let i = 1; i <= nbrPagesAAfficher; i++) {
	// 	console.log("test");
	// 	// return skip + i

	// }


	return isLoading ? (
		<p>Loading ...!</p>
	) : (<>

		<div className="menuSearch">

			<Search className="search" onChange={(e) => research(e)} name="rechercher un personnage" value={searchC} />
			{/* <input
						value={search}
						type="text"
						placeholder="rechercher un personnage"
						onChange={(event) => {
							console.log(event.target.value);
							setSearch(event.target.value);
						}}></input> */}

			{/* </div>  */}
			<div className="buttonsPages">

				{/* <Button actionClick={() => prevPage()} /> */}
				{/* <button>page précédente</button>
					<button>page suivante</button> */}

				<Button className={skip === 0 ? "noBtn" : "btnPrev"} actionClick={() => prevPage()} name="page précédente" value="page précédente" />
				<Button className={isLastPage ? "noBtn" : "btnNext"} actionClick={() => nextPage()} name="page suivante" value="page suivante" />

				{skip !== 1 && <p>page : {skip / 100}</p>}
				{/* // <div> */}



				{/* <p>nbr pages à afficher :{nbrPagesAAfficher}</p>
							<p>nbr pages :{nbrPages}</p> */}
				{/* <p>{data.count} résultats</p>	</div>} */}


			</div>
		</div>

		<div className="container">
			{data.results.map((character) => {
				return (<>
					<div className="charactersCard">

						<article key={character._id}>
							<h2>{character.name}</h2>
							<Link character={character} to={`/comics/${character._id}`} characterid={character._id}>

								<div key={character._id} className="containerImgChar">
									<img
										src={displayImg(character)}
										alt="personnage"
										key={character._id}
									/>
								</div>
							</Link>
							<div key={character._id} className="containerDescription">
								<p key={character._id}>{character.description}</p>
								<FontAwesomeIcon

									className={pinsChar >= 1 ? "checkPins" : "heartIconComics"}  // {/**/}
									icon={["far", "heart"]}
									onClick={() => {
										// const copy = [...pinsChar];
										handlePins(pinsChar.push(character.name));
										console.log("pinschar", pinsChar);
										// setPinsChar(pinsChar.push(character.name));
										Cookies.set("myFavoritesChar", pinsChar, { expires: 666 });

									}} />

							</div>

						</article>

					</div>


				</>)
			})}
		</div>
	</>)





};

export default Characters;
