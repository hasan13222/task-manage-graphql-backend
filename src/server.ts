import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(config.port) },
    });

    console.log(`🚀  Server ready at: ${url}`);
    // server = app.listen(config.port, () => {
    //   console.log(`naria task manager is listening on ${config.port}`);
    // });
  } catch (err) {
    console.log(err)
  }
}

main().catch((err) => console.log(err))

process.on("unhandledRejection", () => {
  console.log("unhandledRejection. shutting down server");
  // if (server) {
  //   server.close(() => {
  //     process.exit(1);
  //   });
  // }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException. shutting down");
  process.exit(1);
});
