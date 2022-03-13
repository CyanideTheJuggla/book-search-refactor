const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-express/node_modules/apollo-server-core');
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});
const startApollo = async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}
startApollo();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
