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
	const [skip, setSkip] = useState(0);
	const [limit] = useState(100);
	const [isLastPage, setIsLastPage] = useState(false);
	const [pinsChar, setPinsChar] = useState([]);


	const handlePins = (character) => {
	  console.log(character.name);
	  // if (pinsChar) {
	  //   const copy = [...pinsChar];
	  //   setPinsChar(copy.push({ "nom": character.name }));
	  //   // console.log("pinsChar: ", pinsChar);
	  //   setPinsChar(JSON.stringify(copy, null, "-"));
	  //   console.log("pinsChar: ", pinsChar);
	  //   Cookies.set("myFavoritesChar", pinsChar, { expires: 666 });
	  // } else {
	  //   setPinsChar([]);
	  //   Cookies.remove("myFavorites");
	  // }
	};
	// JSON.stringify("\uD800"); // '"\\ud800"'  et encodage ??



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
	}, [searchC, skip, limit]);

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
									// {pinsChar >= 1 ? "checkPins" : "heartIconCharacters"}
									className="heartIconCharacters"
									icon={["far", "heart"]}
									onClick={(character) => handlePins(character)} />
							</div>
						</article>
					</div>
				)
			})}
		</div>
	</>)
};

export default Characters;
