import * as hapi from 'hapi';
import { Message } from './Message';
const message = new Message();

export const routes: hapi.IRouteConfiguration[] = [
	{
		method: "GET",
		path: "/message",
		handler: (request: hapi.Request, reply: hapi.IReply) => {
			reply(message.getAllMessages());
		}
	}, {
		method: "POST",
		path: "/message",
		handler: (request: hapi.Request, reply: hapi.IReply) => {
			try {
				var value = request.payload.text;
				new Message().create(value);
				reply('Created');
			} catch (e) {
				reply({
					"statusCode": 404,
					"error": "Not Found",
					"message": e
				});
			}
		}
	}
]
