exports.homeContent = (req, res) => {
    res.status(200).render('base', {
    	title: 'Home'
    });
};

exports.getLoginForm = (req, res) => {
	res.status(200).render('login', {
    	title: 'Login your account'
    });
};

exports.getSignupForm = (req, res) => {
	res.status(200).render('register', {
    	title: 'Register account'
    });
};

exports.getEmailForm = (req, res) => {
	res.status(200).render('email', {
    	title: 'Add Email'
    });
};