import "../assets/css/footer.css";

const Footer = () => {
	return (
		<div className="containerFooter">
			<div className="footer">
				Made with React at Le Reacteur by{" "}
				<a
					href="https://github.com/AudreyAAOO"
					target={"_blank"}
					rel="noreferrer"
				>
					{" "}
					{"\u00A0"}Audrey{"\u00A0"}
				</a>
			</div>
		</div>
	);
};

export default Footer;

// {'\u00A0'} = créer un espace
// rel="noreferrer" warning en l'absence de cet attribut !?
