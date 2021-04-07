import 'reflect-metadata';
import { Upload } from './entity/Upload';
import { Course } from './entity/Course';
import { Tag } from './entity/Tag';
import { CourseResolver } from './resolvers/Course';
import { TagResolver } from './resolvers/Tag';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import dotenv from 'dotenv';
import cors = require('cors');
import cookieParser = require('cookie-parser');

dotenv.config();

const startServer = async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'ELI',
    entities: [
      Course,
      Upload,
      Tag,
    ],
    synchronize: true,
    migrations: ['migration/*.ts'],
    cli: {
      migrationsDir: 'migration',
    },
  });

  const schema = await buildSchema({
    resolvers: [
      CourseResolver,
      TagResolver,
    ],
    nullableByDefault: true,
  });

  const app = Express();
  app.use(cors());
  app.use(cookieParser());
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app });

  app.listen(4300, () => {
    console.log('server started');
  });
};
startServer().catch((e) => {
  console.log(e);
});
