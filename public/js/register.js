"use strict";


const forms = document.querySelector("form");


const signup = async (username, password) => {

	try{
	    const res = await axios({
			method: 'POST',
			url: 'http://127.0.0.1:8080/kudoo/users/Register',
			data: {
				username, password
			}
		})

	 // if (res.data.status === 'success') {
	 // 	window.setTimeout(()=> {
	 // 		location.assign('/');
	 // 	}, 1500);
	 // }
		
	} catch(err){
		console.log(err.response.data)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	signup(username, password);
});