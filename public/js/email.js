"use strict";


const forms = document.querySelector("form");


const Email = async (val) => {

	try {
		const res = await axios({
			method: 'PATCH',
			url: 'http://127.0.0.1:8080/kudoo/users/addEmail',
			data: {
				val
			}
		})
		console.log(res.data);
		//  if (res.data.status === 'success') {
		//  	window.setTimeout(()=> {
		//  		location.assign('/');
		//  	}, 500);
		//  }

	} catch (err) {
		console.log(err.response.data)
	}

};


forms.addEventListener('submit', e => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	Email(email);
});