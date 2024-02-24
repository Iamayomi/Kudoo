"use strict";


const forms = document.querySelector("form");


const signup = async (username, password) => {

	try {
		const response = await axios({
			method: 'POST',
			url: 'http://127.0.0.1:3000/kudoo/users/register',
			data: {
				username, password
			},

		})

		const token = response.data.token;

        localStorage.setItem('token', token);

		if (response.data.status === 'success') {
			window.setTimeout(() => {
				location.assign('/addEmail');
			}, 500);
		} else {
			alert("sign up failed")
		}

	} catch (err) {
		console.log(err.message)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	signup(username, password);
});