import * as hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';
import { schema } from './schema';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import * as mongoose from 'mongoose';
const server: hapi.Server = new hapi.Server()

server.connection({ port: 3000 });

const db = mongoose.connect(`mongodb://localhost:27017/test_db`);

let mongooseSchema = new mongoose.Schema({ action: String });
let Event = db.model('event', mongooseSchema);

let analyticEvent = new Event({ action: 'Click' });

analyticEvent.save((err) => {
	if(err){

	}
	return;
})

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers
});

server.route({
	method: "GET",
	path: "/",
	handler: (request: hapi.Request, reply: hapi.IReply) => {
		reply("Hello World")
	}

});

server.register({
	register: graphqlHapi,
	options: {
		path: '/graphql',
		graphqlOptions: (request) => {
			return { schema: executableSchema };
		},
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
