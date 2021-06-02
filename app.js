const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type Book {
        title: String,
        author: String
    }

    type Query {
        books: [Book],
        book(title: String!): Book
    }

    type Mutation {
        addBook(title: String, author: String): Book,
        deleteBook(title: String): [Book]
    }
`
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

const resolvers = {
    Query: {
        books: () => books,
        book: (_, {title}) => {
          return books.filter((book) => book.title === title)[0];
        }
    },
    Mutation: {
        addBook: (_, book) => book,
        deleteBook: (_, { title }) => {
            let newBooks = books.filter((book) => book.title !== title);
            console.log(newBooks)
            return newBooks;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));

