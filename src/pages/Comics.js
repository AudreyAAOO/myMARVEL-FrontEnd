import "../assets/css/comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import des composants
import Button from "../components/Button";
import Search from "../components/Search";


const Comics = () => {

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [skip, setSkip] = useState(0);
	const [limit] = useState(100);
	const [isLastPage, setIsLastPage] = useState(false);


	useEffect(() => {

		const fetchData = async () => {
			try {

				const response = await axios.get(
					`https://site--mymarvel--hw4gvwsxlwd5.code.run/comics?title=${search}&skip=${skip}&limit=${limit}`);

				setData(response.data);
				setIsLoading(false);
				setIsLastPage(((response.data.count - (skip + limit)) <= 0 ? true : false));
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchData();
	}, [search, skip, limit]);


	let displayImg = (comics) => {
		// eslint-disable-next-line
		return comics.thumbnail.path + "/portrait_medium" + "." + comics.thumbnail.extension
	};


	const researchComics = (event) => {
		setSearch(event.target.value);
		setSkip(0);
	}

	const nextPage = () => {
		setSkip(skip + limit);

	}

	const prevPage = () => {
		if ((skip - limit) > -1) {
			setSkip(skip - limit);
		}
	}

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


			{data.results
			// .sort(function (a, b) {
			// 	return a.title
			// 	.localeCompare(b.title);  //! ?
			// })
			.map((comics, i) => {
				return (
					<div key={comics._id} className="comicsCard">

						<article key={comics._id}>
							<h2>{comics.title}</h2>

							<div key={comics._id} className="containerImgC">
								{comics.thumbnail.path && (
									<img src={displayImg(comics)} alt="couverture_comics" />)}
							</div>

							<div key={i} className="containerDescription">
								<p> {comics.description}</p>

								<FontAwesomeIcon className="heartIconComics" icon={["far", "heart"]} />
							</div>
						</article>
					</div>
				);
			})}
		</div >
	</>);
};

export default Comics;
