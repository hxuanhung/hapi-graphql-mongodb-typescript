export const resolvers = {
	Query: {
		rollDice(root, { numDice, numSides }) {
			return [numDice, numSides];
		}
	}
}
