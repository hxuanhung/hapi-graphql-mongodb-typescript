import { Message } from '../Message';
const message = new Message();

export const schema = [`
type Message {
	_id: String
	text: String!
}

type Query {
	getOne (
		_id: String!
	): Message

	getAll: [Message]
}
`
]

export const resolvers = {
	Query: {
		getOne(root, { _id }) {
			return message.getMessageById(_id);
		},
		getAll(root, {} ) {
			return message.getAllMessages();
		},
	},
};
