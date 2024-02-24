"use strict";


const forms = document.querySelector("form");


const login = async (username, password) => {

	try {
		const response = await axios({
			method: 'POST',
			url: 'http://127.0.0.1:3000/kudoo/users/login',
			data: {
				username, password
			},

		});

		const token = response.data.token;

        localStorage.setItem('token', token);

		if (response.data.status === 'success') {
			window.setTimeout(() => {
				location.assign('/home');
			}, 1000);
		}else {
			alert("Invalid username or password");
		}

	} catch (err) {
		console.log(err.message)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	login(username, password);
});