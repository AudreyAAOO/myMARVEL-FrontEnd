import "../assets/css/button.css";



const Button = ({ className, actionClick, name }) => {
	return <button 
	className={className} 
	onClick={actionClick}>{name}
	</button>;
};

export default Button;
