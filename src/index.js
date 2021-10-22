//schema
//resolvers

import { GraphQLServer } from "graphql-yoga";

//Scalar type: string, Boolean, Int, Float, ID
// ! must return same scalar type
// type name always cap

//demo data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1',
    
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '1'
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1'
}, {
    id: '104',
    text: 'This did no work.',
    author: '2'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '3'
}]



const typeDefs= `
type Query{
    greeting(greeterName: String): String!
    add(a:Float!, b:Float!): String!
    sum(number:[Float]!): Float!
    number: [Int]!
    users: [User!]!
    me: User!
    posts(query: String): [Post]!
    comments: [Comment!]!
    
}

type User{
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post{
    id:ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment!]!
}

type Comment{
    id:ID!
    text: String!
    author: [User]!
}
`
//age value is not must
//resolvers get four args parent,args,ctx,info

const resolvers={
    Query:{
        users:(parent,args,ctx,info)=>{
            return users;
        },
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
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            }

        },
        posts:(_,args)=>{
            if(!args.query)
            {
                return posts;
            }
           return  posts.filter((post)=>{
                return post.title.toLowerCase().includes(args.query.toLowerCase());
            })

        },
        number:()=>{
            return [10,12,15]
        },
        comments:()=>{
            return comments;    
        }
       
    },
    Post:{   //when post call, author call from here. relational database
        author:(parent,args,ctx,info)=>{
            return users.find(user=>{
                return user.id === parent.author
            })
        },
        comments:(parent,args,ctx,info)=>{
            return posts
        }
    },
    Comment:{
        author:(parent,args,ctx,info)=>{
            return users.filter(user=>{
                return user.id === parent.author;
            })
        }
    },
    User:{
        posts:(parent,args,ctx,info)=>{
            return posts.filter(post=>{
                return post.author=== parent.id
            })
        },
        comments:(parent, args, ctx, info)=>{
            return comments.filter(comment =>{
                return comment.author === parent.id;
            })
        }
    },
   
    
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
  
    