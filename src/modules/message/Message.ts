import { MessageModel } from './Message.model';

export class Message {
	getAllMessages() {
		const res = MessageModel.find().exec();
		return res ? res : []
	}

	create(text: string) {
		return new MessageModel({ text: text }).save();
	}
}
