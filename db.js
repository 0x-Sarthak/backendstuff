const mongoose = require('mongoose');
require('dotenv').config();

let connection = mongoose.connect(
	'mongodb+srv://Sarthak:Ahuja@cluster0.epcvqru.mongodb.net/instagram_masai?retryWrites=true&w=majority'
);

module.exports = {
	connection,
};
