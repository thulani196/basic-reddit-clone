

import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { __prod__ } from "../constants/common.constants";
import { Post } from "../entities/Post";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Post],
    dbName: 'reddit_clonedb',
    type: 'postgresql',
    debug: !__prod__,
    password: 'admin123'
} as Parameters<typeof MikroORM.init>[0];