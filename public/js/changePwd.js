"use strict";

const forms = document.querySelector("form");

const changePassword = async (val) => {

	try {
        const token = localStorage.getItem('token');


		const response = await axios({
			method: 'PATCH',
			url: 'http://127.0.0.1:3000/kudoo/users/changePassword', 
			data: { password: val },
			headers: {
				 'Authorization': `Bearer ${token}`,
				 'X-Requested-With': 'XMLHttpRequest'
			}
		});

	    if (response.data.status === 'success') {
			alert("Password changed successfully");
		 };

	} catch(err) {
		console.log(err.message)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const password = document.getElementById('password').value;
	changePassword(password);
});