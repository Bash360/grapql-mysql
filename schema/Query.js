const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLNonNull
} = graphql;
const {
  getAllUsers,
  getNonBlockedUsers,
  getSingleUser,
  getBlockedUsers,
  searchContact
} = require('../db/connect-db.js');
let gender = new GraphQLEnumType({ name: 'gender', values: { male: { vale: 'male' }, female: { value: 'female' } } });

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    imageUrl: {type:GraphQLString},
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
      resolve(parent, args) {
        b
        return searchContact(args.name);
      }
    }
  }
});
module.exports = { RootQuery,UserType,gender };