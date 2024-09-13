const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			login: async (email, password) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method:"POST", 
						headers: {
							"Content-Type": "application/json" 
						},
						body: JSON.stringify({
							email: email, password: password
						})
					});
					if (response.status === 200){
						let data = await response.json();
						sessionStorage.setItem("token", data.token);
						return true;
					}
					else if (response.status === 401){
						return false;
					} else {
						console.log("unexpected error occurred on login", response.status);
						return false;
					}
				} catch(error){
					console.log("There was an error during login", error);
					return false
				}
			}, 
			signUp: async(email, password) => {
				try{
					let response = await fetch(process.env.BACKEND_URL + "/api/sign-up",{
						method:"POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email, password: password
						})
					});
					const data = await response.json();
					console.log(data);
					return data;
				}catch(error){
					console.log("There was a error during sign up", error);
					throw error;	
				}
			},
			goPrivate: async() => {
				if(sessionStorage.getItem("token")) {
					try{
						let response = await fetch(process.env.BACKEND_URL + "/api/private", {
							headers: {Authorization: "Bearer " + sessionStorage.getItem("token")}
						}) 
						if (!response.ok) {return false}
						else{
							let data = await response.json()
							console.log(data)
							return true
						}
					}
					catch(error){
						console.log(error)
						return false
					}
				}
			}
		}
	};
};

export default getState;
