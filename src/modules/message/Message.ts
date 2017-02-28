import { MessageModel } from './Message.model';

export class Message {
	getAllMessages() {
		const res = MessageModel.find().exec();
		return res ? res : []
	}

	getMessageById(id: string) {
		return MessageModel.findById(id, (err, doc) => {
			console.log(err, doc);
			if (err) {
				console.log("Something wrong when get data!");
				return err;
			}

			return doc;
		})
	}

	create(text: string) {
		return new MessageModel({ text: text }).save((err, doc) => {
			console.log(err, doc);
			if (err) {
				console.log("Something wrong when create data!");
				return err;
			}

			return doc;
		});
	}

	modify(id: string, text: string) {
		return MessageModel.findByIdAndUpdate(id, { text: text }, { new: true }, (err, doc) => {
			if (err) {
				console.log("Something wrong when updating data!");
				return err;
			}

			return doc;
		})
	}

	delete(id: string) {
		return MessageModel.findByIdAndRemove(id, (err, doc) => {
			if (err) {
				console.log("Something wrong when delete data!");
				return err;
			}
			return 'Deleted';
		})
	}
}
