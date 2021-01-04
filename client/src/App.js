import React,{useState} from "react";
import axios from "axios";
import './App.css';

function App() {

	const [registerState,setRegisterState] = useState({
		username: "",
		password: ""
	})
	const [loginState,setLoginState] = useState({
		username: "",
		password: ""
	})

	const handleregisterChange = (e) => {
		setRegisterState({...registerState,[e.target.name]: e.target.value});
	}

	const handleLoginChange = (e) => {
		setLoginState({...loginState,[e.target.name]: e.target.value});
	}

	const register = async () => {
		try {
			const res = await axios({
				method: "POST",
				data: {
					username: registerState.username,
					password: registerState.password
				},
				withCredentials: true,
				url: `http://localhost:5000/register`
			});

			console.log(res)
		}
		catch(e) {
			console.log(e);
		}
	}

	const login = async () => {
		try {
			const res = await axios({
				method: "POST",
				data: {
					username: loginState.username,
					password: loginState.password
				},
				withCredentials: true,
				url: `http://localhost:5000/login`
			});

			console.log(res)
		}
		catch(e) {
			console.log(e);
		}
	}

	const getUser = async () => {
		try {
			const res = await axios({
				method: "GET",
				withCredentials: true,
				url: `http://localhost:5000/user`
			})
			console.log(res)

		}
		catch(e) {
			console.log(e);
		}
	}

  return (
    <div className="App">
       	<div>
       		<h1>Register</h1>
       		<input type="text" placeholder="username" name="username" onChange={handleregisterChange} />
       		<input type="text" placeholder="password" name="password" onChange={handleregisterChange} />
       		<button onClick={register} >Submit</button>
       	</div>
       	<div>
       		<h1>Login</h1>
       		<input type="text" placeholder="username" name="username" onChange={handleLoginChange} />
       		<input type="text" placeholder="password" name="password" onChange={handleLoginChange} />
       		<button onClick={login}>Submit</button>
       	</div>
       	<div>
       		<h1>Get User</h1>
       		<button onClick={getUser} >Submit</button>
       	</div>
    </div>
  );
}

export default App;
