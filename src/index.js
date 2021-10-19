//schema
//resolvers

import { GraphQLServer } from "graphql-yoga";

//Scalar type: string, Boolean, Int, Float, ID
// ! must return same scalar type
// type name always cap

const typeDefs= `
type Query{
    greeting(greeterName: String): String!
    add(a:Float!, b:Float!): String!
    sum(number:[Float]!): Float!
    number: [Int]!
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
//resolvers get four args parent,args,ctx,info

const resolvers={
    Query:{
        sum:(parent,args,ctx,info)=>{
            if(args.number.length === 0){
                return 0;
            }
          return args.number.reduce((acc,value)=>{
               return acc + value
           })
        },
        add:(parent,args,ctx,info)=>{
            let sum;
            return sum= `${args.a}`+`${args.b}`
        },
        greeting:(_,args)=>{
            console.log(args)
            return `Konika said to ${args.greeterName}`
        },
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
        },
        number:()=>{
            return [10,12,15]
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
  
    