import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Marvel_Logo from "../assets/img/Marvel_Logo.png";

import "../assets/css/characters.css";

const Characters = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3100/characters");
				// console.log(response.data);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return isLoading ? (
		<p>Loading ...!</p>
	) : (
		<div className="container">
			<div className="hero">
				<img src={Marvel_Logo} alt="" />
				<p>Bienvenue sur mon API Marvel</p>
			</div>
			<Link to={`/comics`}>
				{" "}
				{/* ${character._id} */}
				<div className="charactersCard">
					{data.results.map((character) => {
						return (
							<article key={character._id}>
								<p>{character.name}</p>

								<div className="containerImg">
									<img
										src={
											character.thumbnail.path +
											"." +
											character.thumbnail.extension
										}
										alt="personnage"
									/>
								</div>
							

								<div className="containerDescription">
									<p> {character.description}</p>
								</div>
							</article>
						);
					})}
				</div>
			</Link>
		</div>
	);
};

export default Characters;
