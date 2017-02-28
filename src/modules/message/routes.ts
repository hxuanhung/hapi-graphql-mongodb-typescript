import * as hapi from 'hapi';
import { Message } from './Message';
const message = new Message();

const handlers = {
	getAll: (request: hapi.Request, reply: hapi.IReply) => {
		//curl http://localhost:3000/message
		reply(message.getAllMessages());
	},

	getOne: (request: hapi.Request, reply: hapi.IReply) => {
		//curl http://localhost:3000/message/58b456a613e6a668e092c953
		const id = request.params.id;
		reply(message.getMessageById(id));
	},

	post: (request: hapi.Request, reply: hapi.IReply) => {
		//curl http://localhost:3000/message -X POST -H 'Content-Type: application/json' -d '{"text":"rainbow dash"}'
		try {
			const value = request.payload.text;
			reply(new Message().create(value));
		} catch (e) {
			reply({
				"statusCode": 404,
				"error": "Not Found",
				"message": e
			});
		}
	},

	put: (request: hapi.Request, reply: hapi.IReply) => {
		// curl http://localhost:3000/message/58b456a613e6a668e092c953 -X PUT -H 'Content-Type: application/json' -d '{"text":"rainbow black"}'
		try {
			const id = request.params.id;
			const text = request.payload.text;
			new Message().modify(id, text);
			reply('Modified');
		} catch (e) {
			reply({
				"statusCode": 404,
				"error": "Not Found",
				"message": e
			});
		}
	},

	delete: (request: hapi.Request, reply: hapi.IReply) => {
		//curl -X DELETE localhost:3000/message/58b458334b46b86d8a4f555c
		try {
			const id = request.params.id;
			new Message().delete(id);
			reply('Deleted');
		} catch (e) {
			reply({
				"statusCode": 404,
				"error": "Not Found",
				"message": e
			});
		}
	}
}

export const routes: hapi.IRouteConfiguration[] = [
	{ method: "GET", path: "/message", handler: handlers.getAll },
	{ method: "GET", path: "/message/{id}", handler: handlers.getOne },
	{ method: "POST", path: "/message", handler: handlers.post },
	{ method: "PUT", path: "/message/{id}", handler: handlers.put },
	{ method: "DELETE", path: "/message/{id}", handler: handlers.delete }]
