import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as messageSchema, resolvers as messageResolvers } from './modules/message/graphql/schema';

// const rootSchema = [`
// type Query {
// 	getMessage(
// 		_id: String!
// 	): Message
// }
// `]

// const rootResolvers = {
// 	Query: {
// 		getMessage
// 	}
// }
const schema = [...messageSchema];
const resolvers = merge(messageResolvers);

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
});

export default executableSchema;
