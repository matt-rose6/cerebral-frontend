
const emotionServices = require("../services/emotionServices.js")

module.exports = {
	
	getEmotionList(req, res) {
		return emotionServices.getEmotions;
	}

	getEmotionById(req, res) {
		return emtionServices.getEmotionById;
	}

	addEmotion(req, res) {
		return emotionServices.createEmotion;
	}

	updateEmotion(req, res) {
		return emotionServices.updateEmotion;
	}

	deleteEmotion(req, res) {
		return emotionServices.deleteEmotion;
	}

}