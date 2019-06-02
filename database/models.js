const { db, Sequelize } = require('./db.js');

const user = db.define('user', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	fullName: { type: Sequelize.STRING, required: true },
	userName: { type: Sequelize.STRING, required: true, unique: true },
	password: { type: Sequelize.STRING, required: true },
	phoneNumber: { type: Sequelize.INTEGER, required: true },
    url: { type: Sequelize.STRING}
});


const chate = db.define('chate', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	chates : {type: Sequelize.STRING, required: true},
	user : {type: Sequelize.STRING, required: true}
});

user.hasMany(chate);

module.exports.user = user;
module.exports.chate = chate;

