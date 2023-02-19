import "../assets/css/comicsByCharactersId.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ComicsByCharactersId = () => {

    const params = useParams();
    const characterId = params.characterId;

    const displayImg = (comicsByCharacters) => {
        // eslint-disable-next-line
        return comicsByCharacters.thumbnail.path + "/portrait_fantastic" + "." + comicsByCharacters.thumbnail.extension
    };


    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://site--mymarvel--hw4gvwsxlwd5.code.run/comics/${characterId}`
                );

                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [characterId]);

    return isLoading ? (
        <p>Loading ...!</p>
    ) : (<>
        <div className="container">
            <h3>Retrouvez ce personnage dans les comics suivants :</h3>
            {data.comics.map((comicsByCharacters) => {
                return (<>
                    <div className="comicsCharCard">
                        <article key={comicsByCharacters._id}>
                            <div className="containerImgCC">
                                <img
                                    src={displayImg(comicsByCharacters)}
                                    alt="comics"
                                />
                            </div>
                            <div className="containerDescriptionCard">
                                <p>TITRE</p> 
                                <p>{comicsByCharacters.title}</p>
                                <p>DESCRIPTION</p> 
                                <p>{comicsByCharacters.description}</p>
                                <FontAwesomeIcon className="heartIconCC" icon={["far", "heart"]} />
                            </div>
                        </article>
                    </div>
                </>)
            })}
            <h3><Link to={("/")}> Retourner sur la page d'acceuil</Link></h3>
        </div>
    </>)
}

export default ComicsByCharactersId;




