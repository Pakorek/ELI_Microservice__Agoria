import 'reflect-metadata';
import {Upload} from './entity/Upload';
import {Course} from './entity/Course';
import {Tag} from './entity/Tag';
import {CourseResolver} from './resolvers/Course';
import {TagResolver} from './resolvers/Tag';
import {createConnection} from 'typeorm';
import {buildSchema} from 'type-graphql';
import {ApolloServer} from 'apollo-server-express';
import Express from 'express';
import dotenv from 'dotenv';
import cors = require('cors');
import cookieParser = require('cookie-parser');
import {User} from './entity/User';
import {passwordAuthChecker} from "./utils/auth-checker";

dotenv.config();

const startServer = async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'eli_agoria',
    entities: [User, Course, Upload, Tag],
    synchronize: true,
    migrations: ['migration/*.ts'],
    cli: {
      migrationsDir: 'migration',
    },
  });

  const schema = await buildSchema({
    resolvers: [CourseResolver, TagResolver],
    authChecker: passwordAuthChecker,
    nullableByDefault: true,
  });

  const app = Express();
  app.use(cors());
  app.use(cookieParser());
  const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({req, res}),
  });

  server.applyMiddleware({app});

  app.listen(4100, () => {
    console.log('server started on port 4100');
  });
};
startServer().catch((e) => {
  console.log(e);
});
