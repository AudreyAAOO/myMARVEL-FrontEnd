
import "../assets/css/comicsByCharactersId.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ComicsByCharactersId = () => {

    //! Je récupère l'id présent dans l'url
    const params = useParams();
    const characterId = params.characterId;
    //console.log(params);


    const displayImg = (comicsByCharacters) => { return comicsByCharacters.thumbnail.path + "/standard_fantastic" + "." + comicsByCharacters.thumbnail.extension };


    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("---- useEffect executed ----  ");

        const fetchData = async () => {
            try {
                const response = await axios.get(

                    `https://site--mymarvel--hw4gvwsxlwd5.code.run/comics/${characterId}`
                );
                // console.log("(*＾▽＾)／ response.data: ", response.data);

                // Je stocke le résultat dans data
                setData(response.data);
                // Je fais paser isLoading à false
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);
    //characterId

    return isLoading ? (
        <p>Loading ...!</p>
    ) : (<>
        <div className="container">
 <h2>Retrouvez ce personnage dans les comics suivants :</h2>
            {data.comics.map((comicsByCharacters) => {

                // console.log(comicsByCharacters);
                return (<>
                    <div className="comicsCharCard">
                        <article key={comicsByCharacters._id}>
                           
                            <div className="containerImgCC">
                                <img
                                    src={displayImg(comicsByCharacters)}
                                    alt="comics"
                                />
                            </div>
                            <div className="containerDescription">
                                <p>titre: {comicsByCharacters.title}</p>
                                <p>description: {comicsByCharacters.description}</p>
                            	<FontAwesomeIcon className="heartIconCC" icon={["far", "heart"]} />
							
                            </div>
                        </article>
                    </div>
                </>)


            })}

            <Link to={("/")}> Retourner sur la page d'acceuil</Link>

        </div>
    </>)

}

export default ComicsByCharactersId;




