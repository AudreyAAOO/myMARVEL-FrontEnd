import "../assets/css/search.css";

const Search = ({ value, className, onChange, name }) => {
	return (
		<input
			className={className}
			value={value}
			type="text"
			placeholder={name}
			onChange={onChange}
		></input>
	);
};

export default Search;
