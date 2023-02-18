// useEffect(() => {
//     console.log("---- useEffect executed ----  ");
//     // Je déclare la fonction qui fait la requête
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(
//                 `https://site--mymarvel--hw4gvwsxlwd5.code.run/comics/${id}`
//             );
//             console.log("(*＾▽＾)／ response.data: ", response.data);
//             // Je stocke le résultat dans data
//             setData(response.data);
//             // Je fais paser isLoading à false
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     fetchData();
// }, [id]);