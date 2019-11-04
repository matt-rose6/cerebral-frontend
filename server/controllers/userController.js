
const userServices = require("../services/userServices.js")

module.exports = {
	
	getUserList(req, res) {
		return userServices.getUsers;
	}

	getUserById(req, res) {
		return userServices.getUserById;
	}

	addUser(req, res) {
		return userServices.createUser;
	}

	updateUser(req, res) {
		return userServices.updateUser;
	}

	deleteUser(req, res) {
		return userServices.deleteUser;
	}

}