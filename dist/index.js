"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordAuthChecker = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const helpers_1 = require("./utils/helpers");
const User_1 = require("./entity/User");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User_2 = require("./resolvers/User");
const Course_1 = require("./entity/Course");
const Promotion_1 = require("./entity/Promotion");
const Speciality_1 = require("./entity/Speciality");
const Upload_1 = require("./entity/Upload");
const Evaluation_1 = require("./entity/Evaluation");
const ContactInformation_1 = require("./entity/ContactInformation");
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const Express = require('express');
exports.passwordAuthChecker = async ({ context }, roles) => {
    // `roles` comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    try {
        const token = context.req.headers.authorization.split('Bearer ')[1];
        // console.log('token', token)
        if (token) {
            const manager = typeorm_1.getManager();
            const data = helpers_1.decodeJwt(token);
            context.user = await manager.findOneOrFail(User_1.User, { id: data.userId });
            console.log('passwordAuthChecker : context.user', context.user);
            /**
             * Here, we can reset the token each request to maintain the user connected
             const newToken = generateJwt({ userId: context.user.id });
             context.res.cookie('appSession', newToken, { maxAge: 60 * 24, httpOnly: true });
             */
            return true;
        }
        else {
            return false;
        }
    }
    catch (_a) {
        return false;
    }
};
const startServer = async () => {
    const connexion = await typeorm_1.createConnection({
        type: "mysql",
        host: 'db',
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "ELI",
        entities: [
            User_1.User, Course_1.Course, Promotion_1.Promotion, Speciality_1.Speciality, Upload_1.Upload, Evaluation_1.Evaluation, ContactInformation_1.ContactInformation
        ],
        synchronize: true,
    });
    const schema = await type_graphql_1.buildSchema({
        resolvers: [User_2.UserResolver],
        authChecker: exports.passwordAuthChecker,
    });
    const app = Express();
    app.use(cors());
    app.use(cookieParser());
    const server = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });
    server.applyMiddleware({ app });
    app.listen(4300, () => {
        console.log('server started');
    });
};
startServer();
