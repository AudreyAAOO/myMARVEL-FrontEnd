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
					`https://site--mymarvel--hw4gvwsxlwd5.code.run/comics?title=${search}`);
				console.log("(*＾▽＾)／ response.data: ", response.data);
				// Je stocke le résultat dans data
				setData(response.data);

				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, [search]);

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
		console.log(search);
	}
	const nextPage = () => {

		// `characters?skip=${skip}&limit=${limit}
		// navigate(`/`);
	}

	const prevPage = () => {
		// navigate("/characters");
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
		<div className="container">
			<div className="menu">

				<Search className="search" onChange={(event) => researchComics(event)} name="rechercher un comics" value={search} />

				<div className="buttonsPages">
					<Button className="btnPrev" actionClick={() => prevPage()} name="page précédente" value="page précédente" />
					<Button className="btnNext" actionClick={() => nextPage()} name="page suivante" value="page suivante" />
				</div>
			</div>

			<div className="comicsCard">
				{data.results.sort(function (a, b) {
					//   return a.title - b.title;
					//   return a.title.localeCompare(b.title);
				}).map((comics) => {
					return (
						<>

							<article key={comics._id}>

								<h2>{comics.title}</h2>
								{/*  */}
								<div className="containerImg">
									<img src={comics.thumbnail.path + "/portrait_medium" +
										"." +
										comics.thumbnail.extension
									}
										alt="personnage"
									/>
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

						</>
					);
				})}
			</div>
		</div >
	</>);
};

export default Comics;
