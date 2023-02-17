import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Marvel_Logo from "../assets/img/Marvel_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/characters.css";

// import des composants
import Button from "../components/Button";

const Characters = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://site--mymarvel--hw4gvwsxlwd5.code.run/characters");
				// console.log(response.data);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchData();
	}, []);

	const nextPage = () => {
		console.log("next");
	}
	const prevPage = () => {
		console.log("previous");
	}

	return isLoading ? (
		<p>Loading ...!</p>
	) : (
		<div className="container">
			<div className="hero">
				<img src={Marvel_Logo} alt="" />
				<p>Bienvenue sur mon API Marvel</p>
			</div>
			<div className="menu">
				<div className="search">
					<input
						value={search}
						type="text"
						placeholder="rechercher un personnage"
						onChange={(event) => {
							console.log(event.target.value);
							setSearch(event.target.value);
						}}
					></input>
				</div>
				<div className="buttonsPages">

					{/* <Button actionClick={() => prevPage()} /> */}
					<button>page précédente</button>
					<button>page suivante</button>

					{/* //todo voir cours sur le formulaire publish, comment on a camouflé le button files */}
					<Button actionClick={() => nextPage()} name="eeerr" value="sdbfsdjkfb" />

				</div>
			</div>

			<div className="charactersCard">
				{data.results.map((character) => {
					return (
						<>

							<Link to={`/Comics/${character._id}`}>
								<article key={character._id}>
									<h2>{character.name}</h2>

									<div className="containerImg">
										<img
											src={
												character.thumbnail.path +
												"/standard_xlarge" +
												"." +
												character.thumbnail.extension
											}
											alt="personnage"
										/>
									</div>

									<div className="containerDescription">
										<p> {character.description}</p>
										<FontAwesomeIcon icon={["far", "heart"]} />
									</div>
								</article>
							</Link>
						</>
					);
				})}
			</div>
		</div>
	);
};

export default Characters;
