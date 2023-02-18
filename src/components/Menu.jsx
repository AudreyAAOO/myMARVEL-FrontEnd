import "../assets/css/menu.css";
import { Link } from "react-router-dom";
import Captain_Logo from "../assets/img/Captain_Logo.png";
import Hulk_Logo from "../assets/img/Hulk_Logo.png";

const Menu = ({ search }) => {
	return (
		<div className="containerMenu">
			<span>
				<Link to={"/"}>Personnages</Link>
			</span>
			<div className="logoSeparator">
				<img src={Captain_Logo} alt="" />
			</div>

			<span>
				<Link to={"/comics"}>Comics</Link>
			</span>
			<div className="logoSeparator">
				<img src={Hulk_Logo} alt="" />
			</div>
			<span>
				<Link to={"/favoris"}>Favoris</Link>
			</span>
		</div>
	);
};

export default Menu;
