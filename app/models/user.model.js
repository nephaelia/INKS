module.exports =(sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        },
        displayName: {
            type: Sequelize.STRING
        },
        thirsty: {
            type: Sequelize.BOOLEAN
        },
        bot: {
            type: Sequelize.BOOLEAN
        },
        
     });

    return User;
};