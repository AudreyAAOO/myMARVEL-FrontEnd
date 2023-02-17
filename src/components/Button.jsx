import { useState } from "react";

import "../assets/css/button.css";

const Button = ({ actionClick, action }) => {
	return <button onClick={actionClick}>{action.name}</button>;
};

export default Button;
