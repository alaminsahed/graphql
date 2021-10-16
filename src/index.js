//schema
//resolvers

import { GraphQLServer } from "graphql-yoga";

const typeDefs= `
type Query{
    hello:String!
    name: String!
}
`

const resolvers={
    Query:{
        hello:()=>{
            return `hello world`
        },
        name:()=>{
            return `shamim`
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers})
server.start(()=>console.log(`server is running`));

//go to localhost 4000 & and query for graphql