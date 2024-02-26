"use strict";

const forms = document.querySelector("form");

const Email = async (val) => {

	try {
        const token = localStorage.getItem('token');


		const response = await axios({
			method: 'PATCH',
			url: 'http://127.0.0.1:8000/kudoo/users/addEmail', 
			data: { email: val },
			headers: {
				 'Authorization': `Bearer ${token}`,
				 'X-Requested-With': 'XMLHttpRequest'
			}
		});

	    if (response.data.status === 'success') {
			alert("Email changed successfully");
	 };

	} catch(err) {
		console.log(err.message)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	Email(email);
});