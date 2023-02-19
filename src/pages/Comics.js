import "../assets/css/comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import des composants
import Button from "../components/Button";
import Search from "../components/Search";
// { pins, handlepins }

const Comics = () => {

	// const navigate = useNavigate();

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(100);
	const [isLastPage, setIsLastPage] = useState(false);
	// const [pins, setPins] = useState([]);
	// const params = useParams();
	// const id = params.id;
	// console.log("id", params);

	useEffect(() => {
		console.log("---- useEffect executed ----  ");
		// Je déclare la fonction qui fait la requête
		const fetchData = async () => {
			try {

				const response = await axios.get(
					`https://site--mymarvel--hw4gvwsxlwd5.code.run/comics?title=${search}&skip=${skip}&limit=${limit}`);
				// console.log("(*＾▽＾)／ response.data: ", response.data);
				// Je stocke le résultat dans data
				setData(response.data);
				setIsLoading(false);
				setIsLastPage(((response.data.count - (skip + limit)) <= 0 ? true : false));
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, [search, skip, limit]);


	let displayImg = (comics) => { return comics.thumbnail.path + "/portrait_medium" + "." + comics.thumbnail.extension };


	// useEffect(() => {
	// 	const pins = JSON.parse(localStorage.getItem('pins'));
	// 	if (pins) {
	// 		setPins(pins);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem('pins', JSON.stringify(pins));
	// }, [pins]);

	const researchComics = (event) => {
		//console.log(event.target.value);
		setSearch(event.target.value);
		// console.log(search);
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

	// 	const handlePins = () => {
	// 		const copy = [...pins]
	// 		copy.push({
	// 			name: 2
	// });
	// 		setPins(copy);
	// 		console.log(pins);
	// 	}

	// const handleFavorite = (comics) => {
	// 	// console.log(event.target.value);
	// 	// console.log("test");
	// console.log(comics);
	// 	handlepins("mypinsoritesComics", comics._id);

	// 	console.log(handlepins);
	// 	alert(pins);
	// }

	return isLoading ? (
		<p>Loading ...!</p>
	) : (<>


		<div className="menuSearch">

			<Search className="search" onChange={(event) => researchComics(event)} name="rechercher un comics" value={search} />

			<div className="buttonsPages">
				<Button className={skip === 0 ? "noBtn" : "btnPrev"} actionClick={() => prevPage()} name="page précédente" value="page précédente" />
				<Button className={isLastPage ? "noBtn" : "btnNext"} actionClick={() => nextPage()} name="page suivante" value="page suivante" />

				{skip !== 1 && <p>page : {skip / 100}</p>}
			</div>
		</div>

		<div className="container">



			{data.results.sort(function (a, b) {
				//   return a.title - b.title;
				//   return a.title.localeCompare(b.title);
			}).map((comics) => {
				return (<>
					<div className="comicsCard">

						<article key={comics._id}>
							<h2>{comics.title}</h2>

							<div className="containerImgC">
								<img
									src={displayImg(comics)}
									alt="couverture_comics"
								/>
								{/* <img src={comics.thumbnail.path + 
								"/portrait_medium" +
									"." +
									comics.thumbnail.extension
								}
									alt="personnage"
								/> */}
							</div>

							<div className="containerDescription">
								<p> {comics.description}</p>
								{/* <FontAwesomeIcon icon={["far", "heart"]}
										onClick={handlePins}
									/> */}
								<FontAwesomeIcon className="heartIconComics" icon={["far", "heart"]}
								/>
							</div>
						</article>

					</div>		</>);
			})}

		</div >
	</>);
};

export default Comics;
