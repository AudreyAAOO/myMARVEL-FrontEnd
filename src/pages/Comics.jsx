import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Marvel_Logo from "../assets/img/Marvel_Logo.png";

import "../assets/css/comics.css";

const Comics = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const params = useParams();
	const id = params.id;
	console.log(params);

	useEffect(() => {
		console.log("---- useEffect executed ----  ");
		// Je déclare la fonction qui fait la requête
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://lereacteur-marvel-api.herokuapp.com/comics/${id}`
				);
				console.log("(*＾▽＾)／ response.data: ", response.data);
				// Je stocke le résultat dans data
				setData(response.data);
				// Je fais paser isLoading à false
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, [id]);

	return (
		<>
			<div className="heroComics">
				<img src={Marvel_Logo} alt="" />
				<p>Comics</p>
			</div>
		</>
	);
};

export default Comics;
