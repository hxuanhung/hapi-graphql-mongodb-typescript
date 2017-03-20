import * as hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';
import executableSchema from './schema';
import { makeExecutableSchema } from 'graphql-tools';
import * as mongoose from 'mongoose';
import { ROUTES } from './routes';
import { Message } from './modules/message/Message';

const server: hapi.Server = new hapi.Server()

server.connection({ port: 3000 });

const db = mongoose.connect(`mongodb://localhost/test_db`);

server.route({
	method: "GET",
	path: "/",
	handler: (request: hapi.Request, reply: hapi.IReply) => {
		reply("Hello World")
	}

});

server.route(ROUTES);

server.register({
	register: graphqlHapi,
	options: {
		path: '/graphql',
		graphqlOptions: { schema: executableSchema },
	},
});

server.register({
	register: graphiqlHapi,
	options: {
		path: '/graphiql',
		graphiqlOptions: {
			endpointURL: '/graphql',
		},
	},
});

server.start((err: any) => {
	if (err) {
		throw err;
	}
	console.log("server running at 3000");
})
