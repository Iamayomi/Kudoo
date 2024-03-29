const { sq } = require("../db")
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const appError = require("../utils/appErr");

const User = sq.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "username is required"
            }
        },
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 18]
        }
    },

    passwordResetToken: {
        type: DataTypes.STRING,


    },

    passwordResetExpires: {
        type: DataTypes.DATE,
    },

});



// this hooks encrypt pasword before saving to database
User.beforeSave(async function (user) {
    if (user.changed('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    };

});

// this hooks function check if log in pasword and user password are the same 
User.comparePassword = async function (signinPassword, userPassword) {
    return await bcrypt.compare(signinPassword, userPassword);
};


(async function () {
    try {
        await User.sync()
        console.log("User Model synced")
    } catch (err) {
        console.error("Error syncing model", err)
    }
})();


module.exports = User;