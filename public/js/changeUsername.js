"use strict";

const forms = document.querySelector("form");

const changeUsername = async (username, password) => {

	try {
        const token = localStorage.getItem('token');


		const response = await axios({
			method: 'PATCH',
			url: 'http://127.0.0.1:3000/kudoo/users/changeUsername', 
			data: { username, password },
			headers: {
				 'Authorization': `Bearer ${token}`,
				 'X-Requested-With': 'XMLHttpRequest'
			}
		});

	    if (response.data.status === 'success') {
			alert("username Successfully changed");
		 };

	} catch(err) {
		console.log(err.message)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	console.log(username, password);
	changeUsername(username, password);
});