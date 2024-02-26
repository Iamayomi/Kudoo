const { sq } = require("../db")
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Message = sq.define("message", {

    message: {

        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "message is required"
            }
        },
    },

    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "message is required"
            }
        },
        
        references: {
            model: User,
            key: 'id'
        }
    }
});


Message.belongsTo(User, { foreignKey: 'userId' });

(async function () {
    try {
        await Message.sync()
        console.log("message Model synced")
    } catch (err) {
        console.error("Error syncing model", err)
    }
})();



module.exports = Message;