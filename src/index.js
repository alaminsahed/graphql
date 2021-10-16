//schema
//resolvers

import { GraphQLServer } from "graphql-yoga";

//Scalar type: string, Boolean, Int, Float, ID
// ! must return same scalar type
// type name always cap

const typeDefs= `
type Query{
    me: User!
    post: Post!
}

type User{
    id: ID!
    name: String!
    email: String!
    age: Int
}
type Post{
    id:ID!
    title: String!
    body: String!
}
`
//age value is not must

const resolvers={
    Query:{
        me:()=>{
            return{
                id:"12345",
                name: "jalmal",
                email: "ja@gmail.com",
                age: null
            }
        },
        post:()=>{
            return{
                id: "12345",
                title:"I am ok with it",
                body:"Why I am failed"
            }
        }

    }
}

const server = new GraphQLServer({typeDefs, resolvers})
server.start(()=>console.log(`server is running`));

//go to localhost 4000 & and query for graphql
// query{
//     me{
//       id
//       name
//       email
//       age
//     }
// post{
//     id
//     title
//   }
//   }
  
    