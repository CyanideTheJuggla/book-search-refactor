const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        me: User
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        saveBook(body: BookInput): User
        removeBook(bookId: String!): User
    }

    input BookInput {
        description: String
        title: String
        bookId: String
        image: String
        link: String
        authors: [String]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
