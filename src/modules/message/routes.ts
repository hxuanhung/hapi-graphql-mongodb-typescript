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
	}
]
