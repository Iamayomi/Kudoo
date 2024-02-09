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

    role: {
        type: DataTypes.STRING,
        defaultValue: "user"

    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 18]
        }
    },

    confirmPassword: {
        type: DataTypes.VIRTUAL,
        validate: {
            len: [8, 18]
        }
    },

    passwordResetToken: {
        type: DataTypes.STRING,

    },

    passwordResetExpires: {
        type: DataTypes.DATE,
    }

});

// this hooks check if the both confirm pasword and password are the same before creating the user
User.beforeCreate(async function (user) {
    if (user.password !== user.confirmPassword) {
        throw new appError("provide a valid password", 400);
    }
});

// this hooks encrypt pasword before saving to database
User.beforeSave(async function (user) {
    if (user.changed('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        user.confirmPassword = null;

    }

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