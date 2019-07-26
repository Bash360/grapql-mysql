const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLID,
	GraphQLInt,
	GraphQLEnumType,
	GraphQLNonNull
} = graphql;
const {
	createUser,
	getAllUsers,
	getNonBlockedUsers,
	getSingleUser,
	getBlockedUsers,
	updateUser,
	blockUser,
	deleteUser,
	searchContact
} = require('../db/connect-db.js');
let gender = new GraphQLEnumType({ name: 'gender', values: { male: { vale: 'male' }, female: { value: 'female' } } });

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		contactID: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		gender: {
			type: gender
		},
		phone: { type: GraphQLString },
		blocked: { type: GraphQLInt }
	})
});
const DeleteType = new GraphQLObjectType({
	name: "deleteduser",
	fields:{
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
		deleteuser:{
			type: DeleteType,
			args: {
				contactID: {type: new GraphQLNonNull(GraphQLID) }},
			resolve(parent, args) {
			return	deleteUser(args.contactID);
			 }
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { contactID: { type: GraphQLID } },
			resolve(parent, args) {
				return getSingleUser(args.contactID);
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return getAllUsers();
			}
		},
		blockedusers: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return getBlockedUsers();
			}
		},
		nonblockedusers: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return getNonBlockedUsers();
			}
		},
		searchusers: {
			type: new GraphQLList(UserType),
			args: { name: { type: new GraphQLNonNull(GraphQLString) } },
			resolve(parent, args) {b
				return searchContact(args.name);
			}
		}
	}
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
