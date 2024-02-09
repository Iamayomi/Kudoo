exports.headerContent = (req, res) => {
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