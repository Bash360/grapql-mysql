const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const { RootQuery } = require('./Query');
const Mutation = require('./Mutation');





module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
