exports.homeContent = (req, res) => {
    res.status(200).render('base', {
    	title: 'Anonymous Messages'
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

exports.getHomePage = (req, res) => {
    res.status(200).render('home', {
        title: 'My Profile'
    });
};

exports.getMyMessage = (req, res) => {
    res.status(200).render('myMessage', {
        title: 'My Message'
    });
};

exports.getSettingPage = (req, res) => {
    res.status(200).render('settings', {
        title: 'Settings'
    });
};

exports.getChangeEmailPage = (req, res) => {
    res.status(200).render('changeEmail', {
        title: 'Change Email'
    });
};

exports.getChangePasswordPage = (req, res) => {
    res.status(200).render('changePassword', {
        title: 'Change Password'
    });
};

exports.getChangeUsernamePage = (req, res) => {
    res.status(200).render('changeUsername', {
        title: 'Change Username'
    });
};



