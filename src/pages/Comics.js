import "../assets/css/comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import des composants
import Button from "../components/Button";
import Search from "../components/Search";

const Comics = () => {
	const navigate = useNavigate();

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [searchCo, setSearchCo] = useState("");

	// const params = useParams();
	// const id = params.id;
	// console.log("id", params);

	useEffect(() => {
		console.log("---- useEffect executed ----  ");
		// Je déclare la fonction qui fait la requête
		const fetchData = async () => {
			try {

				const response = await axios.get(
					`https://site--mymarvel--hw4gvwsxlwd5.code.run/comics?title=${searchCo}`);
				console.log("(*＾▽＾)／ response.data: ", response.data);
				// Je stocke le résultat dans data
				setData(response.data);

				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, [searchCo]);

	const researchComics = (event) => {
		//console.log(event.target.value);
		setSearchCo(event.target.value);
		console.log(searchCo);
	}
	const nextPage = () => {

		// `characters?skip=${skip}&limit=${limit}
		// navigate(`/`);
	}

	const prevPage = () => {
		// navigate("/characters");
	}

	return isLoading ? (
		<p>Loading ...!</p>
	) : (<>
		<div className="container">
			<div className="menu">

				<Search className="searchCo" onChange={(event) => researchComics(event)} name="rechercher un comics" value={searchCo} />

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
								{/* "/standard_xlarge" + */}
								<div className="containerImg">
									<img src={comics.thumbnail.path +
										"." +
										comics.thumbnail.extension
									}
										alt="personnage"
									/>
								</div>

								<div className="containerDescription">
									<p> {comics.description}</p>
									<FontAwesomeIcon icon={["far", "heart"]} />
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
