const express = require('express');
const { connection } = require('./DB/db');
const cors = require('cors');
require('dotenv').config();
const { userRouter } = require('./ROUTER/user.router');
const { postRouter } = require('./ROUTER/post.router');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.get('/', (req, res) => {
	res.send('Homepage');
});
app.listen(process.env.PORT, async (req, res) => {
	try {
		await connection;
		console.log(`db is connected`);
		console.log(`it is running on this port ${process.env.PORT}`);
	} catch (error) {
		console.log(error);
		console.log('there is something wrong');
	}
});
