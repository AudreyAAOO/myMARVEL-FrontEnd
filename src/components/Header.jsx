import "../assets/css/header.css";
import Marvel_Logo from "../assets/img/Marvel_Logo.png";


const Header = ()  => {
    return (
    <div className="containerHeader">
			<div className="hero">
				<img src={Marvel_Logo} alt="" />
				<h1>Bienvenue sur mon API Marvel</h1>
                </div>
	</div>
            )
}

export default Header;