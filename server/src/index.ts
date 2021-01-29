import "reflect-metadata";
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants/common.constants';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });

    app.get('/', (_, res) => {
        res.send("Hello...")
    })

    app.listen(4000, () => {
        console.log("server started on localhost:4000")
    })

    // const post = orm.em.create(Post, {title: 'The Start' });
    // orm.em.persistAndFlush(post);
    // const posts = await orm.em.find(Post, {});
    // console.log(posts)
}

main();