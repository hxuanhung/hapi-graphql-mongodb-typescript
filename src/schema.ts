export const schema = `
	type Query {
		 rollDice(numDice: Int!, numSides: Int): [Int]
	}

	schema {
    query: Query
  }
`
