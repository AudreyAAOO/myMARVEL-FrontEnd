import "../assets/css/favorites.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banniere_logos from "../assets/img/Banniere_logos.png";



const Favorites = ({ pinsChar }) => {

	// useEffect(() => {

	// }, []);



	return !pinsChar ? (<>
		{/* //  ou ||pinsComics */}

		<p>Votre collection est vide.</p>
		<img src={Banniere_logos} alt="banniere" />
		<p>Sélectionnez vos items préférés en cliquant sur le <FontAwesomeIcon icon={["far", "heart"]} /></p>

	</>) : (<>
		<div className="containerFavorites">

			<img src={Banniere_logos} alt="banniere" />

			<h3>Mes super-héros préférés :</h3>


			{/* {pinsChar.map((item, index) => {return (<>	</>)	})} */}

			<p> {pinsChar}</p>
			{/* {item.map((elem, index) => {
						{ console.log(elem, index) }
						return (<>
							<p>{elem}</p>
						</>)
					})} */}

			{/* <p key={index}> {item}</p> */}
			{/* <p>{item[1]}</p> */}






			{/* <p>{pinsChar}</p> */}

		</div>

	</>)



	// handlePins(pinsChar.push(character.name, displayImg(character)));





};

export default Favorites;
