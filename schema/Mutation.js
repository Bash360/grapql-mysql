const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const { createUser, updateUser, blockUser, deleteUser } = require('../db/connect-db.js');
const { UserType, gender } = require('./Query');
const joi = require('@hapi/joi');
const DeleteType = new GraphQLObjectType({
	name: 'deleteduser',
	fields: {
		message: { type: GraphQLString },
		usersAffected: { type: GraphQLString }
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				gender: {
					type: gender
				},
				phone: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let { firstName, lastName, email, phone, gender } = args;
				return createUser(firstName, lastName, email, phone, gender);
			}
		},
		blockuser: {
			type: UserType,
			args: {
				contactID: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return blockUser(args.contactID);
			}
		},
		updateuser: {
			type: UserType,
			args: {
				contactID: { type: new GraphQLNonNull(GraphQLID) },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				email: { type: GraphQLString },
				gender: {
					type: gender
				},
				phone: { type: GraphQLString }
			},
			resolve(parent, args) {
				return updateUser(args.contactID, args);
			}
		},
		deleteuser: {
			type: DeleteType,
			args: {
				contactID: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return deleteUser(args.contactID);
			}
		}
	}
});
module.exports = Mutation;
