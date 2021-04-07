"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const AuthResult_1 = require("../entity/AuthResult");
const User_1 = require("../entity/User");
const bcrypt = __importStar(require("bcrypt"));
const helpers_1 = require("../utils/helpers");
const typeorm_1 = require("typeorm");
let UserResolver = UserResolver_1 = class UserResolver {
    constructor() {
        this.userRepo = typeorm_1.getRepository(User_1.User);
        // create Teacher - data: TeacherInput
    }
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async authenticatedUser(ctx) {
        console.log();
        return ctx.user;
    }
    async getUser(ctx) {
        return ctx.user;
    }
    async authenticate(email, password, ctx) {
        const user = await this.userRepo.findOneOrFail({ email: email });
        if (user && await bcrypt.compare(password, user.password) === true) {
            const token = helpers_1.generateJwt({ userId: user.id });
            ctx.res.cookie('appSession', token, { maxAge: 60, httpOnly: true });
            return { token, user };
        }
        else {
            return {};
        }
    }
    /*
        @Mutation(() => User)
        public async createStudent(@Arg('data', () => User) data: User): Promise<User> {
            const hash = await UserResolver.hashPassword(data.password)
            const user = this.userRepo.create({...data, password: hash});
            return await this.userRepo.save(user)
        }
    */
    // @Authorized("TEACHER")
    async createUser(values) {
        // TODO
        // check inputs
        // ... create function in utils folder
        // + decorators in entities
        const hash = await UserResolver_1.hashPassword(values.password);
        const user = this.userRepo.create({ ...values, password: hash });
        return await this.userRepo.save(user);
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "authenticatedUser", null);
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Mutation(() => AuthResult_1.AuthResult, { nullable: true }),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "authenticate", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('values', () => User_1.User)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = UserResolver_1 = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
