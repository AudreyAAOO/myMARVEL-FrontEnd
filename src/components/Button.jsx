import { useState } from "react";

import "../assets/css/button.css";

const Button = ({ actionClick, action, name }) => {
	return <button onClick={actionClick}>{name}</button>;
};

export default Button;
