"use strict";

const userlogout = document.querySelector(".logout");


const logout = async function() {
	try {
		const response = await axios({
			method: 'GET',
			url: 'http://127.0.0.1:8000/kudoo/users/logout'
		});

		if (response.data.status === 'success') {
			location.reload(true);
			alert("User Loggout successfully");

           };
	} catch (err) {
		console.log(err.message)
	}

};


userlogout.addEventListener('click', logout);