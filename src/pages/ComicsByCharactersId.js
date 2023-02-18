
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


    const displayImg = (ComicsByCharacters) => { return ComicsByCharacters.thumbnail.path + "/standard_xlarge" + "." + ComicsByCharacters.thumbnail.extension };


    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("---- useEffect executed ----  ");

        const fetchData = async () => {
            try {
                const response = await axios.get(

                    `https://site--mymarvel--hw4gvwsxlwd5.code.run/comics/${characterId}`
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
    }, []);
    //characterId

    return isLoading ? (
        <p>Loading ...!</p>
    ) : (<>


        {/* {data.results.map((ComicsByCharacters) => { 
          return (<> 
            <Button />
                {console.log("test id", characterId)};
               <article key={ComicsByCharacters._id}> 
                    {/* <h2>{ComicsByCharacters.name}</h2> */}

        {data.comics.map((ComicsByCharacters) => {
            console.log(ComicsByCharacters);
            return (<>

                <div className="containerImg">
                    <img
                        src={displayImg(ComicsByCharacters)}
                        alt="comics"
                    />

                </div>
                <p>titre: {ComicsByCharacters.title}</p>
                <p>description: {ComicsByCharacters.description}</p>
            </>)
        })}


        <Link to={("/")}> Retourner sur la page d'acceuil</Link>






    </>)

}

export default ComicsByCharactersId;




