import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		require: true
	}
});

export const MessageModel = mongoose.model('Message', messageSchema);

