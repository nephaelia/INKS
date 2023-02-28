module.exports = (sequelize, Sequelize) => {
    const Curse = sequelize.define("curse", {
        phrase: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
    }
    });

    return Curse;
};